import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../shared/services/product-api-client.service';
import { Product } from '../../../shared/models/product.model';
import { CategoryService } from '../../../shared/services/category-api-client.service';
import { Category } from '../../../shared/models/category.model';
import { firstValueFrom } from 'rxjs';
import { CartService } from '../../../shared/services/cart.service';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  standalone: true,
  imports: [CommonModule,HeaderComponent],
})
export class ProductPageComponent implements OnInit {
  product: Product | null = null;
  categoryName: string = ''; // Название категории
  private categoryMap: Map<number, string> = new Map();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService // Добавлен сервис корзины
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
  
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categoryMap = new Map(categories.map((cat) => [cat.id, cat.name]));
    });
  
    if (id) {
      this.product = await firstValueFrom(this.productService.getProductById(+id));
      if (this.product) {
        this.categoryName = this.categoryMap.get(this.product.categoryId) || 'Неизвестная категория';
      }
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.incrementItem(this.product.id).subscribe({
        next: () => alert('Товар добавлен в корзину!'),
        error: (err) => console.error('Ошибка добавления товара в корзину:', err),
      });
    }
  }
}
