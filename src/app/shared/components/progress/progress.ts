import { Component, input } from '@angular/core';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [],
  templateUrl: './progress.html',
  styleUrl: './progress.css',
})
export class Progress {
  readonly label = input<string>('');
  readonly value = input<number>(0);
  readonly variant = input<'primary' | 'secondary'>('primary');
}
