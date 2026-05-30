import { Component, effect, input, output } from '@angular/core';

@Component({
  selector: 'app-offcanvas',
  standalone: true,
  imports: [],
  templateUrl: './offcanvas.html',
  styleUrl: './offcanvas.css',
})
export class Offcanvas {
  readonly isOpen   = input<boolean>(false);
  readonly title    = input<string>('');
  readonly subtitle = input<string | undefined>(undefined);
  readonly position = input<'left' | 'right'>('right');

  readonly closed = output<void>();

  constructor() {
    effect(() => {
      document.body.style.overflow = this.isOpen() ? 'hidden' : '';
    });
  }

  protected close(): void {
    this.closed.emit();
  }

  protected onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('offcanvas-backdrop')) {
      this.close();
    }
  }
}
