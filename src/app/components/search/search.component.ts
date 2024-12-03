import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MockProductApiClientService } from '../../shared/services/mock-product-api-client.service';
import { Product } from '../../shared/models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  query: string = ''; // Пользовательский ввод
  searchResults: Product[] = []; // Результаты поиска

  @Output() productSelected = new EventEmitter<number>(); // Для перехода на страницу товара

  constructor(
    private productService: MockProductApiClientService,
    private router: Router
  ) {}

  async onSearch(): Promise<void> {
    if (!this.query.trim()) {
      this.searchResults = [];
      return;
    }

    const products = await this.productService.getProducts();
    const queryLower = this.query.toLowerCase();

    // Фильтрация по бренду и/или модели
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
