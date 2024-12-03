import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MockProductApiClientService } from '../../shared/services/mock-product-api-client.service';
import { Product } from '../../shared/models/product.model';
import { FilterStateService } from '../../shared/services/filter-state.service';
import { Category } from '../../shared/models/category.model';
import { MockApiClientService } from '../../shared/services/mock-api-client.service';

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
  categories: Category[] = [];
  availableBrands: string[] = [];

  constructor(
    private productApiClient: MockProductApiClientService,
    private categoryApiClient: MockApiClientService,
    private filterState: FilterStateService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.products = await this.productApiClient.getProducts();
    this.categoryApiClient.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.filteredProducts = [...this.products];
    });

    this.filterState.filterState$.subscribe((filters) => {
      this.applyFilters(filters);
    });
  }

  applyFilters(filters: any): void {
    const categoryMap = new Map(this.categories.map((cat) => [cat.id, cat.name]));

    this.filteredProducts = this.products.filter((product) => {
      const productCategoryName = categoryMap.get(product.categoryId);

      const matchesCategory =
        filters.category.includes('all') || (productCategoryName && filters.category.includes(productCategoryName));
      const matchesBrand =
        filters.brand.includes('all') || filters.brand.includes(product.brand);
      const matchesModel =
        filters.model.includes('all') || filters.model.includes(product.model);
      const matchesColor =
        filters.color.includes('all') || filters.color.includes(product.color);
      const matchesPrice =
        (filters.priceMin === null || product.price >= filters.priceMin) &&
        (filters.priceMax === null || product.price <= filters.priceMax);

      return matchesCategory && matchesBrand && matchesModel && matchesColor && matchesPrice;
    });
  }
  onProductClick(product: Product): void {
    this.router.navigate(['/product', product.id]); // Переход на страницу товара
  }

  onBuyClick(product: Product): void {
    console.log('Купить товар:', product);
    // Логика покупки товара
  }
}
