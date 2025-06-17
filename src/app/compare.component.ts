import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompareService } from './compare.service';

@Component({
  standalone: true,
  selector: 'app-compare',
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Compare Products</h2>
    <table *ngIf="items.length">
      <tr>
        <th>Name</th>
        <th>Category</th>
        <th>Brand</th>
      </tr>
      <tr *ngFor="let p of items">
        <td>{{ p.name }}</td>
        <td>{{ p.category }}</td>
        <td>{{ p.brand }}</td>
        <td><button (click)="remove(p.id)">Remove</button></td>
      </tr>
    </table>
    <p *ngIf="!items.length">No products selected.</p>
  `
})
export class CompareComponent {
  constructor(public compare: CompareService) {}

  get items() {
    return this.compare.getAll();
  }

  remove(id: number) {
    this.compare.remove(id);
  }
}
