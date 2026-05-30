import { Component, effect, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  readonly isOpen  = input<boolean>(false);
  readonly title   = input<string>('');
  readonly subtitle = input<string | undefined>(undefined);
  readonly size    = input<'sm' | 'md' | 'lg'>('md');

  readonly closed = output<void>();

  constructor() {
    // Lock body scroll when open
    effect(() => {
      document.body.style.overflow = this.isOpen() ? 'hidden' : '';
    });
  }

  protected closeModal(): void {
    this.closed.emit();
  }

  protected onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal();
    }
  }
}
