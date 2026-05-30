import { Component, computed, input, model } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input {
  // Two-way bindable signal model
  readonly value = model<string>('');

  // Sizing & styling inputs
  readonly label = input<string | undefined>(undefined);
  readonly placeholder = input<string>('');
  readonly type = input<'text' | 'email' | 'password' | 'number'>('text');
  readonly prefix = input<string | undefined>(undefined);
  readonly suffix = input<string | undefined>(undefined);
  readonly state = input<'normal' | 'error' | 'success'>('normal');
  readonly message = input<string | undefined>(undefined);

  // Compute classes for validation states
  readonly wrapperClasses = computed(() => {
    return `input-wrapper input-wrapper-${this.state()}`;
  });

  // Handle value typing
  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
  }
}
