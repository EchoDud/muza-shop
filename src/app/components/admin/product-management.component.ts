import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../shared/services/product-api-client.service';
import { Product } from '../../shared/models/product.model';
import { CategoryService } from '../../shared/services/category-api-client.service';
import { Category } from '../../shared/models/category.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    CommonModule,
  ],
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  productForm: FormGroup;
  displayedColumns: string[] = ['id', 'brand', 'categoryId', 'model', 'color', 'description', 'price', 'imageUrl', 'actions'];
  private categoryChildrenMap: Map<number, boolean> = new Map();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.productForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories(); // Загружаем категории при инициализации
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;

      // Для каждой категории проверяем, имеет ли она дочерние категории
      this.categories.forEach((category) => {
        this.categoryService.getChildCategories(category.id).subscribe((children) => {
          // Если дочерние категории есть, сохраняем информацию в мапу
          this.categoryChildrenMap.set(category.id, children.length > 0);
        });
      });
    });
  }

  addProduct() {
    if (this.productForm.invalid) return;

    const newProduct: Product = this.productForm.value;
    this.productService.addProduct(newProduct).subscribe(
      (response) => {
        this.loadProducts(); // Перезагрузить список продуктов
        this.productForm.reset(); // Очистить форму
        this.snackBar.open('Продукт успешно добавлен!', 'Закрыть', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Ошибка при добавлении продукта.', 'Закрыть', { duration: 3000 });
      }
    );
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        this.loadProducts(); // Перезагрузить список продуктов после удаления
        this.snackBar.open('Продукт успешно удален!', 'Закрыть', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Ошибка при удалении продукта.', 'Закрыть', { duration: 3000 });
      }
    );
  }

  isCategoryDisabled(categoryId: number): boolean {
    // Проверяем, есть ли у категории дочерние категории, используя нашу Map
    return this.categoryChildrenMap.get(categoryId) || false;
  }
  
}
