import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';
import { CartItem } from '../../../shared/models/cart-item.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-cart-page',
  standalone: true,
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule],
})
export class CartPageComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  // Обновленные столбцы
  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice', 'remove'];

  constructor(private cartService: CartService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotalPrice();
      },
      error: (err) => console.error('Ошибка при загрузке корзины:', err),
    });
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  }

  incrementQuantity(item: CartItem) {
    this.cartService.incrementItem(item.productId).subscribe(() => {
      this.loadCart();
    });
  }

  decrementQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.decrementItem(item.productId).subscribe(() => {
        this.loadCart();
      });
    }
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeItem(item.productId).subscribe(() => {
      this.loadCart();
    });
  }

  checkout() {
    this.cartService.checkout().subscribe({
      next: () => {
        this.snackBar.open('Успешно оплачено', 'Закрыть', { duration: 3000 });
        this.cartItems = [];
        this.totalPrice = 0;
      },
      error: (err) => alert('Ошибка оплаты: ' + err.message),
    });
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}