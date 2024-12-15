import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../../../shared/services/category-api-client.service';
import { Category } from '../../../shared/models/category.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ProductApiClient } from '../../../shared/services/product-api-client.interface';
import { ProductService } from '../../../shared/services/product-api-client.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,      
    MatOptionModule,
  ],
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  categoryForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'parent', 'actions'];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      parent: [null], // По умолчанию нет родительской категории
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      console.log(this.categories);  // Проверяем, что категории загружаются корректно
    });
  }
  
  // Функция для получения названия родительской категории по parentId
  getParentName(parentId: number | null): string {
    if (!parentId) {
      return 'Нет родителя';
    }
    const parentCategory = this.categories.find(cat => cat.id === parentId);
    return parentCategory ? parentCategory.name : 'Нет родителя';
  }

  addCategory() {
    if (this.categoryForm.invalid) return;
  
    const newCategory = this.categoryForm.value;
  
    // Преобразуем поле "parent" в "parentId" перед отправкой
    newCategory.parentId = newCategory.parent;
    delete newCategory.parent; // Удаляем поле "parent", так как оно не нужно на сервере
  
    console.log(newCategory); // Логируем для проверки
  
    this.categoryService.addCategory(newCategory).subscribe(
      (response) => {
        this.loadCategories();
        this.categoryForm.reset({
          name: '',
          parent: null,
        });
        this.snackBar.open('Категория успешно добавлена!', 'Закрыть', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Ошибка при добавлении категории.', 'Закрыть', { duration: 3000 });
      }
    );
  }

  deleteCategory(categoryId: number) {
    // Проверяем, есть ли продукты или наследники у категории
    this.categoryService.getChildCategories(categoryId).subscribe((childCategories) => {
      if (childCategories.length > 0) {
        this.snackBar.open('Невозможно удалить категорию, так как у нее есть наследники.', 'Закрыть', { duration: 3000 });
      } else {
        // Теперь используем правильный API для получения продуктов по категории
        this.productService.getProductsByCategory(categoryId).subscribe((products) => {
          if (products.length > 0) {
            this.snackBar.open('Невозможно удалить категорию, так как в ней есть продукты.', 'Закрыть', { duration: 3000 });
          } else {
            this.categoryService.deleteCategory(categoryId).subscribe(
              () => {
                this.loadCategories();
                this.snackBar.open('Категория успешно удалена!', 'Закрыть', { duration: 3000 });
              },
              (error) => {
                this.snackBar.open('Ошибка при удалении категории.', 'Закрыть', { duration: 3000 });
              }
            );
          }
        });
      }
    });
  }
}