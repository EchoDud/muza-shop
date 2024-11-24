import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockApiClientService } from '../../shared/services/mock-api-client.service';
import { Category } from '../../shared/models/category.model';
import { CategoryItemComponent } from './category-item/category-item.component';

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

  constructor(private apiClient: MockApiClientService) {}

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
}