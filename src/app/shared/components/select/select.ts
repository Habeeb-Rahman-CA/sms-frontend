import { Component, input, model } from '@angular/core';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class Select {
  // Two-way bindable signal model
  readonly value = model<string>('');

  // Sizing & structural inputs
  readonly label = input<string | undefined>(undefined);
  readonly options = input.required<SelectOption[]>();
  readonly placeholder = input<string | undefined>(undefined);

  // Handle select options typing
  protected onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value.set(target.value);
  }
}
