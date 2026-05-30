import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.html',
  styleUrl: './spinner.css',
})
export class Spinner {
  // Inputs using modern Angular signals
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly label = input<string | undefined>(undefined);
  readonly customClass = input<string>('');

  // Computed classes for the parent container
  readonly containerClasses = computed(() => {
    const classes = ['app-spinner-container'];
    if (this.customClass()) {
      classes.push(this.customClass());
    }
    return classes.join(' ');
  });

  // Computed classes for the spinner circle itself
  readonly spinnerClasses = computed(() => {
    return `app-spinner-circle app-spinner-circle-${this.size()}`;
  });
}
