import { Component } from '@angular/core';
import { UserManagementComponent } from '../../admin/user-management/user-management.component';
import { useAnimation } from '@angular/animations';
import { ProductManagementComponent } from "../../admin/product-managment/product-management.component";
import { CategoryManagementComponent } from "../../admin/category-management/category-management.component";
import { OrderManagementComponent } from "../../admin/order-management/order-management.component";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [UserManagementComponent, ProductManagementComponent, CategoryManagementComponent, OrderManagementComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

}
