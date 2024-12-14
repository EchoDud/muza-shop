import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../shared/services/product-api-client.service';
import { Product } from '../../shared/models/product.model';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatFormFieldModule,
    MatOptionModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  query: string = ''; // Пользовательский ввод
  searchResults: Product[] = []; // Результаты поиска

  @Output() productSelected = new EventEmitter<number>(); // Для перехода на страницу товара

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  async onSearch(): Promise<void> {
    if (!this.query.trim()) {
      this.searchResults = [];
      return;
    }

    const products = await firstValueFrom(this.productService.getProducts());
    const queryLower = this.query.toLowerCase();

    this.searchResults = products.filter(
      (product) =>
        product.brand.toLowerCase().includes(queryLower) ||
        product.model.toLowerCase().includes(queryLower)
    );
  }

  onProductClick(productId: number): void {
    this.router.navigate(['/product', productId]);
    this.searchResults = []; // Очищаем результаты после выбора
  }
}
