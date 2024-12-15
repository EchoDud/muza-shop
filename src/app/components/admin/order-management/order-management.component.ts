import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';  // Добавляем MatCardModule

@Component({
  selector: 'app-order-management',
  standalone: true,
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss'],  // Подключаем стили
  imports: [CommonModule, MatTableModule, MatSnackBarModule, MatCardModule]  // Добавляем MatCardModule
})
export class OrderManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'userId', 'name', 'price', 'quantity', 'status', 'createdDate'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadAllOrderHistory();
  }

  loadAllOrderHistory(): void {
    this.cartService.getAllOrderHistory().subscribe(
      (orders) => {
        this.dataSource.data = orders; // Загружаем данные в таблицу
      },
      (error) => {
        this.snackBar.open('Ошибка при загрузке истории заказов.', 'Закрыть', { duration: 3000 });
      }
    );
  }
}
