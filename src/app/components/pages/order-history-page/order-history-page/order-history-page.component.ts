import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../shared/services/cart.service';
import { CartItem } from '../../../../shared/models/cart-item.model';
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from '../../../header/header.component';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history-page.component.html',
  styleUrls: ['./order-history-page.component.css'],
  imports: [CommonModule, HeaderComponent],
  standalone: true,
})
export class OrderHistoryPageComponent implements OnInit {
  orders: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadOrderHistory();
  }

  loadOrderHistory(): void {
    this.cartService.getOrderHistory().subscribe(
      (orders) => {
        this.orders = orders;
        console.log('Loaded order history:', this.orders);
      },
      (error) => {
        console.error('Error loading order history:', error);
      }
    );
  }
}
