import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { CartItem } from '../../../shared/models/cart-item.model';
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history-page.component.html',
  styleUrls: ['./order-history-page.component.css'],
  imports: [CommonModule, MatCardModule, MatListModule, MatButtonModule, MatIconModule, MatExpansionModule],
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
    const grouped = this.orders.reduce((acc: { [key: string]: { items: CartItem[]; total: number } }, order) => {
      if (order.createdDate) {
        const formattedDate = this.formatDate(order.createdDate);
        if (!acc[formattedDate]) {
          acc[formattedDate] = { items: [], total: 0 };
        }
        acc[formattedDate].items.push(order);
        acc[formattedDate].total += order.price * order.quantity;
      }
      return acc;
    }, {});

    // Преобразуем объект в массив, сортируем по убыванию даты и добавляем общую стоимость
    this.groupedOrders = Object.keys(grouped)
      .map(key => ({
        date: key,
        orders: grouped[key].items,
        totalPrice: grouped[key].total
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Сортировка по дате
  }

  // Форматируем дату до секунд
  formatDate(date: Date): string {
    const d = new Date(date);
    return d.toISOString().split('.')[0]; // Форматируем до секунд
  }

  getStatus(status: string): string {
    switch (status) {
      case 'Paid':
        return 'Оплачено';
      case 'Received':
        return 'Получено';
      case 'Cancelled':
        return 'Отменено';
      default:
        return 'Неизвестный статус';
    }
  }

}
