import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
})
export class Checkbox {
  // Two-way bindable model
  readonly checked = model<boolean>(false);

  // Label and disabled inputs
  readonly label = input<string | undefined>(undefined);
  readonly id = input<string>(`checkbox-${Math.random().toString(36).substring(2, 9)}`);
  readonly disabled = input<boolean>(false);

  // Focus state tracker for premium outline ring styling
  protected isFocused = false;

  // Trigger state toggle
  protected toggle(event: Event): void {
    if (!this.disabled()) {
      const target = event.target as HTMLInputElement;
      this.checked.set(target.checked);
    }
  }
}
