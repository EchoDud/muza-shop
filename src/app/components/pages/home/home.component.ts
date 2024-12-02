import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { RouterModule } from '@angular/router';
import { FiltersComponent } from '../../filters/filters.component';
import { ProductListComponent } from '../../product-list/product-list.component';
import { FilterStateService } from '../../../shared/services/filter-state.service';
import { Product } from '../../../shared/models/product.model';
import { MockProductApiClientService } from '../../../shared/services/mock-product-api-client.service';
import { Category } from '../../../shared/models/category.model';
import { MockApiClientService } from '../../../shared/services/mock-api-client.service';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ HeaderComponent, RouterModule, FiltersComponent, ProductListComponent ],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  availableBrands: string[] = [];
  availableCategories: string[] = [];
  availableModels: string[] = [];
  availableColors: string[] = [];

  constructor(
    private productApiClient: MockProductApiClientService,
    private categoryApiClient: MockApiClientService
  ) {}

  async ngOnInit(): Promise<void> {
    // Загрузка продуктов
    this.products = await this.productApiClient.getProducts();

    // Загрузка категорий
    this.categoryApiClient.getCategories().subscribe((categories) => {
      this.categories = categories;

      // Преобразуем категории: сопоставляем id -> name
      const categoryMap = new Map(categories.map((cat) => [cat.id, cat.name]));

      // Уникальные категории для фильтра
      this.availableCategories = [
        ...new Set(this.products.map((p) => categoryMap.get(p.categoryId))),
      ].filter((name) => name !== undefined) as string[];

      console.log('Available categories:', this.availableCategories);
    });

    // Уникальные бренды, модели и цвета
    this.availableBrands = [...new Set(this.products.map((p) => p.brand))];
    this.availableModels = [...new Set(this.products.map((p) => p.model))];
    this.availableColors = [...new Set(this.products.map((p) => p.color))];

    console.log('Available brands:', this.availableBrands);
    console.log('Available models:', this.availableModels);
    console.log('Available colors:', this.availableColors);
  }

  onApplyFilters(): void {
    console.log('Filters applied');
  }
}

