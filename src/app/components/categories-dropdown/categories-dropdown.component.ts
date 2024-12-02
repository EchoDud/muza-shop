import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockApiClientService } from '../../shared/services/mock-api-client.service';
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
    private apiClient: MockApiClientService,
    private filterState: FilterStateService
  ) {}

  ngOnInit(): void {
    this.apiClient.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  getRootCategories(): Category[] {
    return this.categories.filter(cat => cat.parentId === null);
  }

  onCategorySelect(categoryId: number): void {
    const selectedCategories = [categoryId, ...this.apiClient.getChildCategories(categoryId)];
    const categoryNames = selectedCategories
      .map(id => this.categories.find(cat => cat.id === id)?.name)
      .filter(name => name) as string[];

    // Обновляем фильтры в сервисе
    this.filterState.updateFilters({ category: categoryNames });

    // Закрываем дропдаун
    this.isDropdownOpen = false;

    console.log('Selected categories:', categoryNames);
  }
}