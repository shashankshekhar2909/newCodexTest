import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from './product.service';
import { CompareService } from './compare.service';

@Component({
  standalone: true,
  selector: 'app-search',
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <h2>Products</h2>
    <div class="search-page">
      <div class="filters">
        <h3>Filters</h3>
        <div>
          <label>Category:</label>
          <select [(ngModel)]="categoryFilter">
            <option value="">All</option>
            <option *ngFor="let c of categories" [value]="c">{{ c }}</option>
          </select>
        </div>
      </div>
      <div class="results">
        <div *ngFor="let p of filteredProducts">
          <a [routerLink]="['/product', p.id]">{{ p.name }}</a>
          <button (click)="compare.add(p)">Compare</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `.search-page { display: flex; }
     .filters { width: 200px; margin-right: 20px; }
     .results { flex: 1; }
    `]
})
export class SearchComponent {
  products: Product[] = [];
  categoryFilter = '';
  categories = this.productService.categories();

  constructor(private route: ActivatedRoute, private productService: ProductService, public compare: CompareService) {
    this.route.queryParams.subscribe(params => {
      const query = params['query'] || '';
      this.products = this.productService.search(query);
    });
  }

  get filteredProducts(): Product[] {
    return this.products.filter(p => !this.categoryFilter || p.category === this.categoryFilter);
  }
}
