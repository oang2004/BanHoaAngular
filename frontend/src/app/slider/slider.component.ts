import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: false,
  
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  images: string[] = [
    'assets/baner1.jpg',
    'assets/banner/banner1.jpg',
    'assets/baner2.jpg',
    'assets/baner3.jpg'
  ];
  currentIndex: number = 0;

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = 
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
