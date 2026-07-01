import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';
import { Checkbox } from '../../../shared/components/checkbox/checkbox';
import { Alert } from '../../../shared/components/alert/alert';
import { Modal } from '../../../shared/components/modal/modal';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Button, Input, Checkbox, Alert, Modal],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  // Form state signals
  protected readonly identifier = signal('');
  protected readonly password = signal('');
  protected readonly rememberMe = signal(false);

  // UI state signals
  protected readonly loading = signal(false);
  protected readonly showPassword = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  // Modal state
  protected readonly isContactOpen = signal(false);

  // Field validation signals
  protected readonly identifierState = signal<'normal' | 'error'>('normal');
  protected readonly identifierMsg = signal('');
  protected readonly passwordState = signal<'normal' | 'error'>('normal');
  protected readonly passwordMsg = signal('');

  constructor(
    private readonly authService: AuthService,
    public readonly router: Router,
  ) {}

  protected togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  protected onIdentifierChange(val: string): void {
    this.identifier.set(val);
    if (val.trim()) {
      this.identifierState.set('normal');
      this.identifierMsg.set('');
    }
  }

  protected onPasswordChange(val: string): void {
    this.password.set(val);
    if (val) {
      this.passwordState.set('normal');
      this.passwordMsg.set('');
    }
  }

  protected get passwordType(): 'text' | 'password' {
    return this.showPassword() ? 'text' : 'password';
  }

  protected get passwordSuffixIcon(): string {
    return this.showPassword() ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
  }

  private resetStates(): void {
    this.identifierState.set('normal');
    this.identifierMsg.set('');
    this.passwordState.set('normal');
    this.passwordMsg.set('');
    this.errorMessage.set(null);
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.resetStates();

    let hasError = false;

    if (!this.identifier().trim()) {
      this.identifierState.set('error');
      this.identifierMsg.set('Email or username is required');
      hasError = true;
    }

    if (!this.password()) {
      this.passwordState.set('error');
      this.passwordMsg.set('Password is required');
      hasError = true;
    }

    if (hasError) return;

    this.loading.set(true);

    this.authService.signIn({
      identifier: this.identifier().trim().toLowerCase(),
      password: this.password(),
    }).subscribe({
      next: () => {
        this.loading.set(false);
        // Navigate to dashboard after successful sign in
        this.router.navigate(['/showcase']);
      },
      error: (err) => {
        this.loading.set(false);
        let msg = 'An error occurred. Please try again.';
        if (err.error?.message) {
          msg = Array.isArray(err.error.message)
            ? err.error.message.join(', ')
            : err.error.message;
        }
        this.errorMessage.set(msg);
      },
    });
  }
}
