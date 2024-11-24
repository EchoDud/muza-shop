import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

export interface ICategoryApiClient {
  getCategories(): Observable<Category[]>;
}
