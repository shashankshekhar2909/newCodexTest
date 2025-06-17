import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';
import { CompareService } from './compare.service';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="product">
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <p>Category: {{ product.category }}</p>
      <p>Brand: {{ product.brand }}</p>
      <p>Manufacturer: {{ product.manufacturer }}</p>
      <button (click)="compare.add(product)">Compare</button>
    </div>
  `
})
export class ProductDetailComponent {
  product = this.productService.getById(parseInt(this.route.snapshot.params['id'], 10));
  constructor(private route: ActivatedRoute, private productService: ProductService, public compare: CompareService) {}
}
