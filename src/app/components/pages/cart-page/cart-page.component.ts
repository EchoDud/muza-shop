import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';
import { CartItem } from '../../../shared/models/cart-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  imports: [CommonModule],
})
export class CartPageComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotalPrice();
      },
      error: (err) => console.error('Error loading cart:', err),
    });
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  }

  incrementItem(productId: number) {
    this.cartService.incrementItem(productId).subscribe(() => {
      this.loadCart();
    });
  }

  decrementItem(productId: number) {
    this.cartService.decrementItem(productId).subscribe(() => {
      this.loadCart();
    });
  }

  removeItem(productId: number) {
    this.cartService.removeItem(productId).subscribe(() => {
      this.loadCart();
    });
  }

  checkout() {
    this.cartService.checkout().subscribe({
      next: () => {
        alert('Оплата успешно завершена!');
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
