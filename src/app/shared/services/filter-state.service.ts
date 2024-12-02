import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterStateService {
  private filters = {
    category: 'all',
    priceMin: null as number | null,
    priceMax: null as number | null,
    brand: ['all'] as string[], // Изменено на массив строк
  };

  private filterStateSubject = new BehaviorSubject(this.filters);
  filterState$ = this.filterStateSubject.asObservable();

  updateFilters(newFilters: Partial<typeof this.filters>) {
    this.filters = { ...this.filters, ...newFilters };
    this.filterStateSubject.next(this.filters);
  }

  resetFilters() {
    this.filters = {
      category: 'all',
      priceMin: null,
      priceMax: null,
      brand: ['all'], // Изменено на массив строк
    };
    this.filterStateSubject.next(this.filters);
  }
}