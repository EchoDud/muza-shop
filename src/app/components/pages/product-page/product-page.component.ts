import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MockProductApiClientService } from '../../../shared/services/mock-product-api-client.service';
import { Product } from '../../../shared/models/product.model';
import { MockApiClientService } from '../../../shared/services/mock-api-client.service';
import { Category } from '../../../shared/models/category.model';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ProductPageComponent implements OnInit {
  product: Product | null = null;
  categoryName: string = ''; // Название категории
  private categoryMap: Map<number, string> = new Map();

  constructor(
    private route: ActivatedRoute,
    private productService: MockProductApiClientService,
    private categoryService: MockApiClientService // Сервис для категорий
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    // Загружаем категории и создаем карту ID -> Название
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));
    });

    // Загружаем продукт по ID
    if (id) {
      this.product = await this.productService.getProductById(+id);
      if (this.product) {
        // Получаем название категории
        this.categoryName = this.categoryMap.get(this.product.categoryId) || 'Неизвестная категория';
      }
    }
  }
}
