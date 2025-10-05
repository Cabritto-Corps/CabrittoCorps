import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class Faq {
  openIndex = signal<number | null>(0);
  toggle(i: number) {
    this.openIndex.set(this.openIndex() === i ? null : i);
  }
}


