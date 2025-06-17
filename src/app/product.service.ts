import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  manufacturer: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Widget A', category: 'Gadgets', brand: 'BrandX', manufacturer: 'Manu1', description: 'A fancy gadget.' },
    { id: 2, name: 'Widget B', category: 'Gadgets', brand: 'BrandY', manufacturer: 'Manu2', description: 'Another fancy gadget.' },
    { id: 3, name: 'Gizmo', category: 'Tools', brand: 'BrandX', manufacturer: 'Manu1', description: 'A useful tool.' },
    { id: 4, name: 'Thingamajig', category: 'Tools', brand: 'BrandZ', manufacturer: 'Manu3', description: 'A versatile tool.' }
  ];

  getAll(): Product[] {
    return this.products;
  }

  getById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  search(query: string): Product[] {
    const q = query.toLowerCase();
    return this.products.filter(p => p.name.toLowerCase().includes(q));
  }

  categories(): string[] {
    return Array.from(new Set(this.products.map(p => p.category)));
  }

  brands(): string[] {
    return Array.from(new Set(this.products.map(p => p.brand)));
  }

  manufacturers(): string[] {
    return Array.from(new Set(this.products.map(p => p.manufacturer)));
  }
}
