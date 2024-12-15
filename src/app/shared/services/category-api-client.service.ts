import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl = 'http://localhost:5000/api/category';
  private readonly tokenKey = 'auth_token';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(this.tokenKey);
    }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  // Получение всех категорий
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  // Получение дочерних категорий
  getChildCategories(parentId: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/${parentId}/children`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/add`, category, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
