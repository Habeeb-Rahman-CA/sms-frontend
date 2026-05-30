import { Component, OnInit, input, output } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast implements OnInit {
  readonly message = input<string>('');
  readonly type = input<ToastType>('success');
  readonly icon = input<string | undefined>(undefined);
  readonly duration = input<number>(4000);

  readonly close = output<void>();

  ngOnInit(): void {
    if (this.duration() > 0) {
      setTimeout(() => {
        this.dismiss();
      }, this.duration());
    }
  }

  protected dismiss(): void {
    this.close.emit();
  }

  protected getIconClass(): string {
    if (this.icon()) return this.icon()!;
    switch (this.type()) {
      case 'success': return 'fa-solid fa-circle-check';
      case 'error': return 'fa-solid fa-circle-xmark';
      case 'warning': return 'fa-solid fa-circle-exclamation';
      case 'info': return 'fa-solid fa-circle-info';
    }
  }
}
