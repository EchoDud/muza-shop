import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { CartItem } from '../../../shared/models/cart-item.model';
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history-page.component.html',
  styleUrls: ['./order-history-page.component.css'],
  imports: [CommonModule, MatCardModule, MatListModule, MatButtonModule, MatIconModule],
  standalone: true,
})
export class OrderHistoryPageComponent implements OnInit {
  orders: CartItem[] = [];
  groupedOrders: any[] = [];  // Группировка заказов

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadOrderHistory();
  }

  loadOrderHistory(): void {
    this.cartService.getOrderHistory().subscribe(
      (orders) => {
        this.orders = orders;
        this.groupOrdersByDate();
      },
      (error) => {
        console.error('Error loading order history:', error);
      }
    );
  }

  // Группировка заказов по времени
  groupOrdersByDate(): void {
    const grouped = this.orders.reduce((acc: { [key: string]: CartItem[] }, order) => {  // Указан тип для аккумулятора
      if (order.createdDate) {
        const formattedDate = this.formatDate(order.createdDate);
        if (!acc[formattedDate]) {
          acc[formattedDate] = [];
        }
        acc[formattedDate].push(order);
      }
      return acc;
    }, {});
  
    // Преобразуем объект в массив для отображения
    this.groupedOrders = Object.keys(grouped).map(key => ({
      date: key,
      orders: grouped[key]
    }));
  }

  // Форматируем дату до секунд
  formatDate(date: Date): string {
    const d = new Date(date);
    return d.toISOString().split('.')[0]; // Форматируем до секунд
  }
}
