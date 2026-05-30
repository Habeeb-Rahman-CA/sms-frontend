import { Component, computed, input, model } from '@angular/core';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [],
  templateUrl: './radio.html',
  styleUrl: './radio.css',
})
export class Radio {
  // Two-way bindable model representing selected value in a group
  readonly modelValue = model<any>(null);

  // Structural inputs
  readonly value = input.required<any>();
  readonly label = input.required<string>();
  readonly id = input<string>(`radio-${Math.random().toString(36).substring(2, 9)}`);
  readonly disabled = input<boolean>(false);

  // Compute checked status
  readonly checked = computed(() => this.modelValue() === this.value());

  // Focus state tracker for premium outline ring styling
  protected isFocused = false;

  // Trigger state selection
  protected select(): void {
    if (!this.disabled()) {
      this.modelValue.set(this.value());
    }
  }
}
