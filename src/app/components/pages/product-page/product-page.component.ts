import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../shared/services/product-api-client.service';
import { Product } from '../../../shared/models/product.model';
import { CategoryService } from '../../../shared/services/category-api-client.service';
import { Category } from '../../../shared/models/category.model';
import { firstValueFrom } from 'rxjs';
import { CartService } from '../../../shared/services/cart.service';

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
  cartItemQuantity: number = 0; // Количество товара в корзине

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
        this.checkIfInCart(this.product.id); // Проверка, есть ли товар в корзине
      }
    }
  }

  // Проверка, добавлен ли товар в корзину
  checkIfInCart(productId: number) {
    this.cartService.getCartItems().subscribe((cartItems) => {
      const cartItem = cartItems.find(item => item.productId === productId);
      if (cartItem) {
        this.cartItemQuantity = cartItem.quantity; // Устанавливаем количество товара в корзине
      }
    });
  }

  // Увеличение количества товара в корзине
  incrementQuantity() {
    if (this.product) {
      this.cartService.incrementItem(this.product.id).subscribe({
        next: () => {
          this.cartItemQuantity++;
        },
        error: (err) => console.error('Ошибка увеличения товара в корзине:', err),
      });
    }
  }

  // Уменьшение количества товара в корзине
  decrementQuantity() {
    if (this.product && this.cartItemQuantity > 1) {
      this.cartService.decrementItem(this.product.id).subscribe({
        next: () => {
          this.cartItemQuantity--;
        },
        error: (err) => console.error('Ошибка уменьшения товара в корзине:', err),
      });
    }
  }

  // Добавление товара в корзину
  addToCart() {
    if (this.product) {
      this.cartService.incrementItem(this.product.id).subscribe({
        next: () => {
          this.cartItemQuantity = 1; // Устанавливаем количество товара в корзине на 1
          alert('Товар добавлен в корзину!');
        },
        error: (err) => console.error('Ошибка добавления товара в корзину:', err),
      });
    }
  }

  // Удаление товара из корзины
  removeFromCart() {
    if (this.product) {
      this.cartService.removeItem(this.product.id).subscribe({
        next: () => {
          this.cartItemQuantity = 0; // Устанавливаем количество товара в корзине на 0
          alert('Товар удален из корзины!');
        },
        error: (err) => console.error('Ошибка удаления товара из корзины:', err),
      });
    }
  }
}
