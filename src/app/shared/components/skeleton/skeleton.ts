import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.css',
})
export class Skeleton {
  // Preset layouts matching the spec screenshot
  readonly variant = input<'card' | 'list-item' | 'text'>('card');
  // Number of text lines (for 'text' variant)
  readonly lines = input<number>(3);
}
