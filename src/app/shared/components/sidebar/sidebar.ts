import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SidebarNavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
  href?: string;
}

export interface SidebarNavGroup {
  label?: string;
  items: SidebarNavItem[];
}

export interface SidebarBottomItem {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  host: {
    '[class.collapsed]': 'isCollapsed()'
  }
})
export class Sidebar {
  readonly schoolName    = input<string>('Oakhaven Academy');
  readonly schoolRole    = input<string>('Teacher Portal');
  readonly schoolInitial = input<string>('O');
  readonly navGroups     = input<SidebarNavGroup[]>([]);
  readonly activeItemId  = input<string>('');
  readonly bottomItems   = input<SidebarBottomItem[]>([]);
  readonly collapsed     = input<boolean>(false);

  readonly itemClick       = output<SidebarNavItem>();
  readonly bottomItemClick = output<SidebarBottomItem>();
  readonly collapseToggle  = output<boolean>();

  protected readonly isCollapsed = signal(false);

  protected toggleCollapse(): void {
    const next = !this.isCollapsed();
    this.isCollapsed.set(next);
    this.collapseToggle.emit(next);
  }

  protected onItemClick(event: Event, item: SidebarNavItem): void {
    if (!item.href) {
      event.preventDefault();
    }
    this.itemClick.emit(item);
  }

  protected onBottomClick(item: SidebarBottomItem): void {
    this.bottomItemClick.emit(item);
  }
}
