import { Component, computed, input, model } from '@angular/core';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  readonly data = input<any[]>([]);
  readonly columns = input<TableColumn[]>([]);

  readonly sortColumn = model<string | undefined>(undefined);
  readonly sortDirection = model<'asc' | 'desc'>('asc');

  // Compute sorted data reactively based on input data and sort models
  readonly sortedData = computed(() => {
    const list = [...this.data()];
    const col = this.sortColumn();
    const dir = this.sortDirection();

    if (!col) return list;

    return list.sort((a, b) => {
      let valA = a[col];
      let valB = b[col];

      if (valA === undefined || valA === null) valA = '';
      if (valB === undefined || valB === null) valB = '';

      // Clean comparisons for strings vs numbers vs dates
      if (typeof valA === 'string') {
        return dir === 'asc' 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      } else {
        return dir === 'asc' 
          ? (valA > valB ? 1 : -1) 
          : (valB > valA ? 1 : -1);
      }
    });
  });

  protected onHeaderClick(column: TableColumn): void {
    if (!column.sortable) return;

    const currentCol = this.sortColumn();
    const currentDir = this.sortDirection();

    if (currentCol === column.key) {
      // Toggle sort direction
      this.sortDirection.set(currentDir === 'asc' ? 'desc' : 'asc');
    } else {
      // Sort new column ascending
      this.sortColumn.set(column.key);
      this.sortDirection.set('asc');
    }
  }

  protected getSortIcon(columnKey: string): string {
    if (this.sortColumn() !== columnKey) return 'fa-solid fa-sort';
    return this.sortDirection() === 'asc' 
      ? 'fa-solid fa-sort-up text-green' 
      : 'fa-solid fa-sort-down text-green';
  }
}
