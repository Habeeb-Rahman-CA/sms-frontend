import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [],
  templateUrl: './grid.html',
  styleUrl: './grid.css',
})
export class Grid {
  readonly cols = input<number>(6);
  readonly gap = input<string>('16px');

  protected readonly gridStyle = computed(() => {
    return {
      'display': 'grid',
      'gap': this.gap(),
      'grid-template-columns': `repeat(${this.cols()}, 1fr)`
    };
  });
}
