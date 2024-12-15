import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../shared/services/category-api-client.service';
import { Category } from '../../shared/models/category.model';
import { CategoryItemComponent } from './category-item/category-item.component';
import { FilterStateService } from '../../shared/services/filter-state.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-dropdown',
  standalone: true,
  imports: [CommonModule, MatMenuModule, CategoryItemComponent, MatButtonModule],
  templateUrl: './categories-dropdown.component.html',
  styleUrls: ['./categories-dropdown.component.css'],
})
export class CategoriesDropdownComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private filterState: FilterStateService
  ) {}

  ngOnInit(): void {
    // Загрузка всех категорий через API
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  getRootCategories(): Category[] {
    return this.categories.filter((cat) => cat.parentId === null);
  }

  getChildren(categoryId: number): Category[] {
    return this.categories.filter((cat) => cat.parentId === categoryId);
  }

  onCategorySelect(categoryId: number): void {
    this.router.navigate(['/']);
  
    // Функция для получения всех дочерних категорий рекурсивно
    const getAllChildCategories = (categoryId: number): Category[] => {
      const children = this.getChildren(categoryId); // Получаем дочерние категории для текущей категории
      let allChildren: Category[] = [];
  
      // Если у категории есть дочерние элементы, добавляем их и рекурсивно ищем дальше
      if (children.length > 0) {
        children.forEach(child => {
          allChildren = [...allChildren, ...getAllChildCategories(child.id)];
        });
      } else {
        // Если дочерних категорий нет, добавляем саму категорию
        allChildren.push(this.categories.find(cat => cat.id === categoryId)!);
      }
  
      return allChildren;
    };
  
    // Получаем все дочерние категории для выбранной категории (или саму категорию, если дочерних нет)
    const selectedCategories = getAllChildCategories(categoryId);
  
    // Добавляем в фильтры только имена выбранных категорий
    const selectedCategoryNames = selectedCategories
      .map((cat) => cat.name)
      .filter((name) => name) as string[];
  
    // Обновляем фильтры с выбранными категориями
    this.filterState.updateCategoryFilters(selectedCategoryNames);
    console.log('Selected categories:', selectedCategoryNames);
  }
}



