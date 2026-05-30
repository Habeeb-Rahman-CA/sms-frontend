import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [],
  templateUrl: './popover.html',
  styleUrl: './popover.css',
})
export class Popover {
  readonly title = input<string>('');
  readonly content = input<string>('');
  readonly position = input<'top' | 'bottom' | 'left' | 'right'>('top');

  protected readonly isVisible = signal(false);

  protected show(): void {
    this.isVisible.set(true);
  }

  protected hide(): void {
    this.isVisible.set(false);
  }
}
