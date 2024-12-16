import { Component } from '@angular/core';
import { UserManagementComponent } from '../../admin/user-management/user-management.component';
import { ProductManagementComponent } from "../../admin/product-managment/product-management.component";
import { CategoryManagementComponent } from "../../admin/category-management/category-management.component";
import { OrderManagementComponent } from "../../admin/order-management/order-management.component";
import { MatSidenavModule } from '@angular/material/sidenav';  // Импортируем MatSidenavModule
import { MatListModule } from '@angular/material/list';  // Импортируем MatListModule
import { CommonModule } from '@angular/common';
import { VisitStatisticsComponent } from "../../admin/visit-stats/visit-stats.component";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    UserManagementComponent,
    CommonModule,
    ProductManagementComponent,
    CategoryManagementComponent,
    OrderManagementComponent,
    MatSidenavModule, // Добавляем MatSidenavModule
    MatListModule // Добавляем MatListModule
    ,
    VisitStatisticsComponent
],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  selectedComponent: string = 'user-management';  // Начальный компонент

  selectComponent(componentName: string): void {
    this.selectedComponent = componentName;
  }
}
