import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../../shared/models/category.model'; 

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CategoryItemComponent {
  @Input() category!: Category;
  @Input() categories: Category[] = [];
  @Output() categorySelected = new EventEmitter<number>();

  get children(): Category[] {
    return this.categories.filter(cat => cat.parentId === this.category.id);
  }

  onSelect(): void {
    this.categorySelected.emit(this.category.id);
  }
}
