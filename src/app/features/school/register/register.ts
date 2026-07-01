import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';
import { Checkbox } from '../../../shared/components/checkbox/checkbox';
import { Alert } from '../../../shared/components/alert/alert';
import { Modal } from '../../../shared/components/modal/modal';
import { SchoolService } from '../../../core/services/school.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Button, Input, Checkbox, Alert, Modal],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  // Form signals
  protected readonly schoolName = signal('');
  protected readonly schoolCode = signal('');
  protected readonly adminName = signal('');
  protected readonly email = signal('');
  protected readonly phone = signal('');
  protected readonly password = signal('');
  protected readonly agreeTerms = signal(false);

  // Modal states
  protected readonly isTermsOpen = signal(false);
  protected readonly isPrivacyOpen = signal(false);

  // UI state signals
  protected readonly loading = signal(false);
  protected readonly showPassword = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly successMessage = signal<string | null>(null);

  // Field validation states
  protected readonly schoolNameState = signal<'normal' | 'error'>('normal');
  protected readonly schoolNameMsg = signal('');

  protected readonly schoolCodeState = signal<'normal' | 'error'>('normal');
  protected readonly schoolCodeMsg = signal('');

  protected readonly adminNameState = signal<'normal' | 'error'>('normal');
  protected readonly adminNameMsg = signal('');

  protected readonly emailState = signal<'normal' | 'error'>('normal');
  protected readonly emailMsg = signal('');

  protected readonly phoneState = signal<'normal' | 'error'>('normal');
  protected readonly phoneMsg = signal('');

  protected readonly passwordState = signal<'normal' | 'error'>('normal');
  protected readonly passwordMsg = signal('');

  protected readonly agreeTermsState = signal<'normal' | 'error'>('normal');
  protected readonly agreeTermsMsg = signal('');

  constructor(
    private readonly schoolService: SchoolService,
    private readonly router: Router
  ) {}

  protected togglePasswordVisibility(): void {
    this.showPassword.update((val) => !val);
  }

  protected onSchoolNameChange(val: string): void {
    this.schoolName.set(val);
    if (val.trim()) {
      this.schoolNameState.set('normal');
      this.schoolNameMsg.set('');
    }
  }

  protected onSchoolCodeChange(val: string): void {
    this.schoolCode.set(val);
    if (val.trim()) {
      this.schoolCodeState.set('normal');
      this.schoolCodeMsg.set('');
    }
  }

  protected onAdminNameChange(val: string): void {
    this.adminName.set(val);
    if (val.trim()) {
      this.adminNameState.set('normal');
      this.adminNameMsg.set('');
    }
  }

  protected onEmailChange(val: string): void {
    this.email.set(val);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val.trim() && emailRegex.test(val)) {
      this.emailState.set('normal');
      this.emailMsg.set('');
    }
  }

  protected onPasswordChange(val: string): void {
    this.password.set(val);
    if (val && val.length >= 8) {
      this.passwordState.set('normal');
      this.passwordMsg.set('');
    }
  }

  protected onAgreeTermsChange(val: boolean): void {
    this.agreeTerms.set(val);
    if (val) {
      this.agreeTermsState.set('normal');
      this.agreeTermsMsg.set('');
    }
  }

  protected get passwordType(): 'text' | 'password' {
    return this.showPassword() ? 'text' : 'password';
  }

  protected get passwordSuffixIcon(): string {
    return this.showPassword() ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
  }

  private resetValidationStates(): void {
    this.schoolNameState.set('normal');
    this.schoolNameMsg.set('');
    this.schoolCodeState.set('normal');
    this.schoolCodeMsg.set('');
    this.adminNameState.set('normal');
    this.adminNameMsg.set('');
    this.emailState.set('normal');
    this.emailMsg.set('');
    this.phoneState.set('normal');
    this.phoneMsg.set('');
    this.passwordState.set('normal');
    this.passwordMsg.set('');
    this.agreeTermsState.set('normal');
    this.agreeTermsMsg.set('');
    this.errorMessage.set(null);
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.resetValidationStates();

    let hasError = false;

    // Validate School Name
    if (!this.schoolName().trim()) {
      this.schoolNameState.set('error');
      this.schoolNameMsg.set('School name is required');
      hasError = true;
    }

    // Validate School Code
    if (!this.schoolCode().trim()) {
      this.schoolCodeState.set('error');
      this.schoolCodeMsg.set('School code is required');
      hasError = true;
    }

    // Validate Admin Name
    if (!this.adminName().trim()) {
      this.adminNameState.set('error');
      this.adminNameMsg.set('Admin name is required');
      hasError = true;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email().trim()) {
      this.emailState.set('error');
      this.emailMsg.set('Email address is required');
      hasError = true;
    } else if (!emailRegex.test(this.email())) {
      this.emailState.set('error');
      this.emailMsg.set('Please enter a valid email address');
      hasError = true;
    }

    // Validate Password
    if (!this.password()) {
      this.passwordState.set('error');
      this.passwordMsg.set('Password is required');
      hasError = true;
    } else if (this.password().length < 8) {
      this.passwordState.set('error');
      this.passwordMsg.set('Password must be at least 8 characters long');
      hasError = true;
    }

    // Validate Terms Agreement
    if (!this.agreeTerms()) {
      this.agreeTermsState.set('error');
      this.agreeTermsMsg.set('You must agree to the Terms of Service and Privacy Policy');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Call API
    this.loading.set(true);
    const payload = {
      schoolName: this.schoolName(),
      schoolCode: this.schoolCode().toUpperCase(),
      adminName: this.adminName(),
      email: this.email().toLowerCase(),
      phone: this.phone() || undefined,
      password: this.password(),
    };

    this.schoolService.registerSchool(payload).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.successMessage.set('Account registered successfully! Redirecting...');
        
        // Reset form
        this.schoolName.set('');
        this.schoolCode.set('');
        this.adminName.set('');
        this.email.set('');
        this.phone.set('');
        this.password.set('');
        this.agreeTerms.set(false);

        // Redirect to admin dashboard after brief delay
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (err) => {
        this.loading.set(false);
        let errorMsg = 'An error occurred during registration. Please try again.';
        if (err.error && err.error.message) {
          if (Array.isArray(err.error.message)) {
            errorMsg = err.error.message.join(', ');
          } else {
            errorMsg = err.error.message;
          }
        }
        this.errorMessage.set(errorMsg);
      },
    });
  }
}
