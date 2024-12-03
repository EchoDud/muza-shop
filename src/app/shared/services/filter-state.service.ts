import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterStateService {
  private filters = {
    category: ['all'] as string[],
    brand: ['all'] as string[],
    model: ['all'] as string[],
    color: ['all'] as string[],
    priceMin: null as number | null,
    priceMax: null as number | null,
  };

  private filterStateSubject = new BehaviorSubject(this.filters);
  filterState$ = this.filterStateSubject.asObservable();

  updateFilters(newFilters: Partial<typeof this.filters>) {
    this.filters = { ...this.filters, ...newFilters };
    this.filterStateSubject.next(this.filters);
  }

  resetFilters() {
    this.filters = {
      category: ['all'],
      brand: ['all'],
      model: ['all'],
      color: ['all'],
      priceMin: null,
      priceMax: null,
    };
    this.filterStateSubject.next(this.filters);
  }

  // Новый метод для обновления только категории
  updateCategoryFilters(categories: string[]) {
    this.updateFilters({ category: categories });
  }
}
