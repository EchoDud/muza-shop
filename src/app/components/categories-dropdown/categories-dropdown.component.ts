import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../shared/services/category-api-client.service';
import { Category } from '../../shared/models/category.model';
import { CategoryItemComponent } from './category-item/category-item.component';
import { FilterStateService } from '../../shared/services/filter-state.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

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
    this.categoryService.getChildCategories(categoryId).subscribe((children) => {
      const selectedCategories = [
        categoryId,
        ...children.map((cat) => cat.id),
      ]
        .map((id) => this.categories.find((cat) => cat.id === id)?.name)
        .filter((name) => name) as string[];

      this.filterState.updateCategoryFilters(selectedCategories);
      console.log('Selected categories:', selectedCategories);
    });
  }
}



