import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class Badge {
  // Inputs using modern Angular signals
  readonly variant = input<'new' | 'standard' | 'urgent'>('standard');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly customClass = input<string>('');

  // Computed classes
  readonly badgeClasses = computed(() => {
    const classes = [
      'app-badge',
      `app-badge-${this.variant()}`,
      `app-badge-${this.size()}`,
    ];
    if (this.customClass()) {
      classes.push(this.customClass());
    }
    return classes.join(' ');
  });
}
