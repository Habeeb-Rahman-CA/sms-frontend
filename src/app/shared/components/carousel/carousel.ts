import { Component, computed, input, model, signal, effect } from '@angular/core';

export interface CarouselSlide {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
  readonly slides = input.required<CarouselSlide[]>();
  readonly autoPlay = input<boolean>(false);
  readonly autoPlayInterval = input<number>(4000);

  protected readonly currentIndex = signal(0);

  readonly currentSlide = computed(() => this.slides()[this.currentIndex()]);
  readonly totalSlides = computed(() => this.slides().length);

  readonly hasPrev = computed(() => this.currentIndex() > 0);
  readonly hasNext = computed(() => this.currentIndex() < this.totalSlides() - 1);

  protected prev(): void {
    if (this.hasPrev()) {
      this.currentIndex.update(i => i - 1);
    }
  }

  protected next(): void {
    if (this.hasNext()) {
      this.currentIndex.update(i => i + 1);
    }
  }

  protected goTo(index: number): void {
    this.currentIndex.set(index);
  }
}
