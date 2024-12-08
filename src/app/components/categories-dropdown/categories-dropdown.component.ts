import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../shared/services/category-api-client.service';
import { Category } from '../../shared/models/category.model';
import { CategoryItemComponent } from './category-item/category-item.component';
import { FilterStateService } from '../../shared/services/filter-state.service';

@Component({
  selector: 'app-categories-dropdown',
  standalone: true,
  imports: [CategoryItemComponent, CommonModule],
  templateUrl: './categories-dropdown.component.html',
  styleUrls: ['./categories-dropdown.component.css'],
})
export class CategoriesDropdownComponent implements OnInit {
  categories: Category[] = [];
  isDropdownOpen = false;

  constructor(
    private categoryService: CategoryService,
    private filterState: FilterStateService
  ) {}

  ngOnInit(): void {
    // Загрузка всех категорий через реальный API
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  getRootCategories(): Category[] {
    return this.categories.filter((cat) => cat.parentId === null);
  }

  onCategorySelect(categoryId: number): void {
    // Получаем дочерние категории с сервера
    this.categoryService.getChildCategories(categoryId).subscribe((children) => {
      const childCategoryIds = children.map((cat) => cat.id);

      // Находим все выбранные категории
      const selectedCategories = [
        categoryId,
        ...childCategoryIds,
      ]
        .map((id) => this.categories.find((cat) => cat.id === id)?.name)
        .filter((name) => name) as string[];

      // Обновляем категории в состоянии фильтра
      this.filterState.updateCategoryFilters(selectedCategories);

      // Закрываем дропдаун
      this.isDropdownOpen = false;

      console.log('Selected categories:', selectedCategories);
    });
  }
}
