import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICategoryApiClient } from './api-client.interface';
import { categories } from '../mock-data/categories.mock';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root', // Автоматическая регистрация провайдера
})
export class MockApiClientService implements ICategoryApiClient {
  
  getCategories(): Observable<Category[]> {
    return of(categories);
  }
}
