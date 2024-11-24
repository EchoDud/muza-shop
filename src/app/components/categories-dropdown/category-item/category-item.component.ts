import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../../shared/models/category.model'; 

@Component({
  selector: 'app-category-item',
  template: `
    <div class="category-item">
      <button>{{ category.name }}</button>
      <div class="category-children" *ngIf="children.length > 0">
        <ng-container *ngFor="let child of children">
          <app-category-item [category]="child" [categories]="categories"></app-category-item>
        </ng-container>
      </div>
    </div>

  `,
  styleUrls: ['../categories-dropdown.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CategoryItemComponent {
  @Input() category!: Category;
  @Input() categories: Category[] = [];

  get children(): Category[] {
    return this.categories.filter(cat => cat.parentId === this.category.id);
  }
}
