import { Component, computed, input, model } from '@angular/core';

@Component({
  selector: 'app-range',
  standalone: true,
  imports: [],
  templateUrl: './range.html',
  styleUrl: './range.css',
})
export class Range {
  // Two-way bindable value
  readonly value = model<number>(0);

  // Configuration inputs
  readonly label = input<string | undefined>(undefined);
  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly step = input<number>(1);
  readonly showValue = input<boolean>(true);
  readonly suffix = input<string>('');

  // Compute percentage fill for the gradient track
  readonly fillPercent = computed(() => {
    const range = this.max() - this.min();
    return range === 0 ? 0 : ((this.value() - this.min()) / range) * 100;
  });

  // Track style with the green-to-gray gradient
  readonly trackStyle = computed(() => {
    return `background: linear-gradient(to right, var(--range-primary) 0%, var(--range-primary) ${this.fillPercent()}%, var(--range-track) ${this.fillPercent()}%, var(--range-track) 100%)`;
  });

  protected onInput(event: Event): void {
    this.value.set(Number((event.target as HTMLInputElement).value));
  }
}
