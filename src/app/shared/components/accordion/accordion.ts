import { Component, computed, input, signal } from '@angular/core';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [],
  templateUrl: './accordion.html',
  styleUrl: './accordion.css',
})
export class Accordion {
  readonly items = input.required<AccordionItem[]>();
  // Allow multiple open panels, or single — controlled via allowMultiple
  readonly allowMultiple = input<boolean>(false);

  // Tracks which IDs are currently open
  private readonly openIds = signal<Set<string>>(new Set());

  readonly isOpen = (id: string) => computed(() => this.openIds().has(id));

  toggle(id: string): void {
    this.openIds.update(current => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!this.allowMultiple()) next.clear();
        next.add(id);
      }
      return next;
    });
  }
}
