import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class Faq {
  openIndex = signal<number | null>(0);
  toggle(i: number) {
    this.openIndex.set(this.openIndex() === i ? null : i);
  }
}


