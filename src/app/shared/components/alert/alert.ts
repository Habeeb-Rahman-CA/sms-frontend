import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  readonly title = input<string>('');
  readonly message = input<string>('');
  readonly type = input<'success' | 'danger' | 'warning' | 'info'>('success');
  readonly icon = input<string | undefined>(undefined);
  readonly dismissible = input<boolean>(false);

  readonly close = output<void>();

  protected readonly isDismissed = signal(false);

  protected getIconClass(): string {
    if (this.icon()) return this.icon()!;
    switch (this.type()) {
      case 'success': return 'fa-solid fa-circle-check';
      case 'danger': return 'fa-solid fa-triangle-exclamation';
      case 'warning': return 'fa-solid fa-circle-exclamation';
      case 'info': return 'fa-solid fa-circle-info';
    }
  }

  protected dismiss(): void {
    this.isDismissed.set(true);
    this.close.emit();
  }
}
