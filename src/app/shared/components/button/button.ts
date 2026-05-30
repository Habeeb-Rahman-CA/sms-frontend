import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  // Inputs using modern Angular signal inputs
  readonly variant = input<'primary' | 'outline' | 'ghost'>('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly iconLeft = input<string | undefined>(undefined);
  readonly iconRight = input<string | undefined>(undefined);
  readonly customClass = input<string>('');

  // Computed classes for the button styling
  readonly buttonClasses = computed(() => {
    const classes = [
      'app-btn',
      `app-btn-${this.variant()}`,
      `app-btn-${this.size()}`,
    ];
    
    if (this.disabled() || this.loading()) {
      classes.push('app-btn-disabled');
    }
    
    if (this.loading()) {
      classes.push('app-btn-loading');
    }
    
    if (this.customClass()) {
      classes.push(this.customClass());
    }
    
    return classes.join(' ');
  });

  // Computed state for disabled flag (combining disabled and loading)
  readonly isDisabled = computed(() => this.disabled() || this.loading());
}
