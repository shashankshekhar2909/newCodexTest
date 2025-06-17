import { Injectable } from '@angular/core';
import { Product } from './product.service';

@Injectable({ providedIn: 'root' })
export class CompareService {
  private list: Product[] = [];

  add(product: Product) {
    if (!this.list.find(p => p.id === product.id)) {
      this.list.push(product);
    }
  }

  remove(id: number) {
    this.list = this.list.filter(p => p.id !== id);
  }

  getAll(): Product[] {
    return this.list;
  }
}
