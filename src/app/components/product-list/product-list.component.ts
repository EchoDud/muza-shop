import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../shared/services/product-api-client.service';
import { CategoryService } from '../../shared/services/category-api-client.service';
import { Product } from '../../shared/models/product.model';
import { FilterStateService } from '../../shared/services/filter-state.service';
import { Category } from '../../shared/models/category.model';
import { CartService } from '../../shared/services/cart.service'; // Импортируем CartService
import { AuthService } from '../../shared/services/auth.service'; // Импортируем AuthService
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'; // Импортируем MatSnackBar
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  availableBrands: string[] = [];
  cartItems: Map<number, number> = new Map();  // Сохраняем количество товара в корзине

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private filterState: FilterStateService,
    private router: Router,
    private cartService: CartService,  // Добавляем CartService
    private authService: AuthService,  // Добавляем AuthService
    private snackBar: MatSnackBar    // Добавляем MatSnackBar для уведомлений
  ) {}

  async ngOnInit(): Promise<void> {
    this.products = await firstValueFrom(this.productService.getProducts());
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.filteredProducts = [...this.products];
    });

    this.filterState.filterState$.subscribe((filters) => {
      this.applyFilters(filters);
    });

    // Загружаем текущие товары в корзине
    this.cartService.getCartItems().subscribe((items) => {
      items.forEach(item => {
        this.cartItems.set(item.productId, item.quantity);
      });
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
    if (this.authService.isAuthenticated()) {
      // Если авторизован, добавляем товар в корзину
      this.cartService.incrementItem(product.id).subscribe({
        next: () => {
          this.cartItems.set(product.id, (this.cartItems.get(product.id) || 0) + 1); // Обновляем количество
          this.snackBar.open('Товар добавлен в корзину!', 'Закрыть', { duration: 3000 });
        },
        error: (err) => {
          console.error('Ошибка добавления товара в корзину:', err);
          this.snackBar.open('Ошибка добавления товара в корзину', 'Закрыть', { duration: 3000 });
        },
      });
    } else {
      // Если не авторизован, показываем диалог авторизации
      this.openAuthDialog();
    }
  }

  openAuthDialog(): void {
    // Логика открытия диалога для авторизации
    console.log('Открыть диалог для авторизации');
  }

  // Увеличение количества товара в корзине
  incrementQuantity(productId: number) {
    this.cartService.incrementItem(productId).subscribe({
      next: () => {
        this.cartItems.set(productId, (this.cartItems.get(productId) || 0) + 1); // Увеличиваем количество товара в корзине
      },
      error: (err) => console.error('Ошибка увеличения товара в корзине:', err),
    });
  }

  // Уменьшение количества товара в корзине
  decrementQuantity(productId: number) {
    const currentQuantity = this.cartItems.get(productId) || 0;
    if (currentQuantity > 1) {
      this.cartService.decrementItem(productId).subscribe({
        next: () => {
          this.cartItems.set(productId, currentQuantity - 1); // Уменьшаем количество товара в корзине
        },
        error: (err) => console.error('Ошибка уменьшения товара в корзине:', err),
      });
    }
  }

  // Удаление товара из корзины
  removeFromCart(productId: number) {
    this.cartService.removeItem(productId).subscribe({
      next: () => {
        this.cartItems.delete(productId); // Удаляем товар из корзины
        this.snackBar.open('Товар удален из корзины!', 'Закрыть', { duration: 3000 });
      },
      error: (err) => console.error('Ошибка удаления товара из корзины:', err),
    });
  }
}
