import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockProductApiClientService } from '../../shared/services/mock-product-api-client.service';
import { Product } from '../../shared/models/product.model';
import { FilterStateService } from '../../shared/services/filter-state.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  availableBrands: string[] = [];

  constructor(
    private productApiClient: MockProductApiClientService,
    private filterState: FilterStateService
  ) {}

  async ngOnInit(): Promise<void> {
    this.products = await this.productApiClient.getProducts();
    this.availableBrands = [...new Set(this.products.map((p) => p.brand))];
    this.filteredProducts = [...this.products];

    this.filterState.filterState$.subscribe((filters) => {
      this.applyFilters(filters);
    });
  }

  applyFilters(filters: any): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory =
        filters.category === 'all' || product.categoryId.toString() === filters.category;
  
      const matchesBrand =
        filters.brand.includes('all') || filters.brand.includes(product.brand);
  
      const matchesPrice =
        (filters.priceMin === null || product.price >= filters.priceMin) &&
        (filters.priceMax === null || product.price <= filters.priceMax);
  
      return matchesCategory && matchesBrand && matchesPrice;
    });
  }
  onProductClick(product: Product): void {
    console.log('Товар выбран:', product);
    // Здесь можно реализовать переход на страницу товара:
    // this.router.navigate(['/product', product.id]);
  }

  onBuyClick(product: Product): void {
    console.log('Купить товар:', product);
    // Логика покупки товара
  }
}
