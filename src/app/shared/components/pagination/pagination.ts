import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  // Inputs using modern Angular signals
  readonly currentPage = input<number>(1);
  readonly totalPages = input.required<number>();

  // Outputs using modern Angular signal outputs
  readonly pageChange = output<number>();

  // Compute page numbers and dots structure to match visual designs
  readonly pageItems = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const items: (number | string)[] = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        items.push(i);
      }
    } else {
      // Near start: [1] [2] [3] ... [total]
      if (current <= 2) {
        items.push(1, 2, 3, '...', total);
      }
      // Near end: [1] ... [total-2] [total-1] [total]
      else if (current >= total - 1) {
        items.push(1, '...', total - 2, total - 1, total);
      }
      // In the middle: [1] ... [current] ... [total]
      else {
        items.push(1, '...', current, '...', total);
      }
    }

    return items;
  });

  // Check navigation availability
  readonly hasPrevious = computed(() => this.currentPage() > 1);
  readonly hasNext = computed(() => this.currentPage() < this.totalPages());

  // Navigate methods
  protected selectPage(page: number | string): void {
    if (typeof page === 'number' && page !== this.currentPage() && page >= 1 && page <= this.totalPages()) {
      this.pageChange.emit(page);
    }
  }

  protected previousPage(): void {
    if (this.hasPrevious()) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  protected nextPage(): void {
    if (this.hasNext()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }
}
