import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Routes, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';
import { CompareService } from './compare.service';
import { HomeComponent } from './home.component';
import { SearchComponent } from './search.component';
import { ProductDetailComponent } from './product-detail.component';
import { CompareComponent } from './compare.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, FormsModule, RouterModule, RouterOutlet],
  template: `
    <header>
      <input type="text" [(ngModel)]="searchText" (input)="updateSuggestions()" placeholder="Search" />
      <ul class="suggestions" *ngIf="suggestions.length">
        <li *ngFor="let s of suggestions" (click)="selectSuggestion(s)">{{ s }}</li>
      </ul>
    </header>
    <nav>
      <a routerLink="/">Home</a> |
      <a routerLink="/compare">Compare ({{ compareCount }})</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [
    `header { position: relative; }
     .suggestions { position: absolute; background: #fff; list-style: none; padding: 0; margin: 0; border: 1px solid #ccc; width: 200px; }
     .suggestions li { padding: 4px; cursor: pointer; }
     .suggestions li:hover { background: #eee; }
    `]
})
export class AppComponent {
  searchText = '';
  suggestions: string[] = [];

  constructor(private router: Router, private productService: ProductService, private compareService: CompareService) {}

  updateSuggestions() {
    const q = this.searchText.toLowerCase();
    this.suggestions = q ? this.productService.search(q).map(p => p.name) : [];
  }

  selectSuggestion(name: string) {
    this.searchText = name;
    this.suggestions = [];
    this.router.navigate(['/search'], { queryParams: { query: name } });
  }

  get compareCount() {
    return this.compareService.getAll().length;
  }
}

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'compare', component: CompareComponent }
];
