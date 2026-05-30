import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface NavItem {
  id: string;
  label: string;
  icon?: string;
  badge?: number;
}

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  readonly schoolName   = input<string>('Oakhaven Academy');
  readonly navItems     = input<NavItem[]>([]);
  readonly activeNavId  = input<string>('');
  readonly notifications = input<number>(0);
  readonly avatarUrl    = input<string | undefined>(undefined);
  readonly avatarInitials = input<string>('AD');
  readonly searchPlaceholder = input<string>('Global Search...');

  readonly navChange    = output<string>();
  readonly searchChange = output<string>();
  readonly notificationClick = output<void>();
  readonly settingsClick = output<void>();
  readonly avatarClick  = output<void>();

  protected readonly searchQuery = signal('');
  protected readonly mobileMenuOpen = signal(false);

  protected readonly hasNotifications = computed(() => this.notifications() > 0);
  protected readonly notifLabel = computed(() =>
    this.notifications() > 99 ? '99+' : String(this.notifications())
  );

  protected onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
    this.searchChange.emit(value);
  }

  protected onNavClick(id: string): void {
    this.navChange.emit(id);
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }
}
