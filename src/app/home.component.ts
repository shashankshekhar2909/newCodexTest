import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Home</h2>
    <div class="tabs">
      <button (click)="active='categories'">Category</button>
      <button (click)="active='brands'">Brand</button>
      <button (click)="active='manufacturers'">Manufacturer</button>
    </div>
    <ul *ngIf="active==='categories'">
      <li *ngFor="let c of categories">{{ c }}</li>
    </ul>
    <ul *ngIf="active==='brands'">
      <li *ngFor="let b of brands">{{ b }}</li>
    </ul>
    <ul *ngIf="active==='manufacturers'">
      <li *ngFor="let m of manufacturers">{{ m }}</li>
    </ul>
  `,
  styles: [
    `.tabs button { margin-right: 4px; }`
  ]
})
export class HomeComponent {
  active = 'categories';
  categories = this.products.categories();
  brands = this.products.brands();
  manufacturers = this.products.manufacturers();

  constructor(private products: ProductService) {}
}
