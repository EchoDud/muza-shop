import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FiltersComponent } from '../../filters/filters.component';
import { ProductListComponent } from '../../product-list/product-list.component';
import { FilterStateService } from '../../../shared/services/filter-state.service';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product-api-client.service';
import { Category } from '../../../shared/models/category.model';
import { CategoryService } from '../../../shared/services/category-api-client.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ RouterModule, FiltersComponent, ProductListComponent],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  availableBrands: string[] = [];
  availableCategories: string[] = [];
  availableModels: string[] = [];
  availableColors: string[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  async ngOnInit(): Promise<void> {
    // Используем `firstValueFrom` для получения данных из Observable
    this.products = await firstValueFrom(this.productService.getProducts());
  
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
  
      const categoryMap = new Map(categories.map((cat) => [cat.id, cat.name]));
      this.availableCategories = [
        ...new Set(this.products.map((p) => categoryMap.get(p.categoryId))),
      ].filter((name) => name !== undefined) as string[];
  
      console.log('Available categories:', this.availableCategories);
    });
  
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
