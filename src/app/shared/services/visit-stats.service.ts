import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitStatsService {

  private readonly apiUrl = 'http://localhost:5000/api/visitstats'; // Путь, как в вашем контроллере
  private readonly tokenKey = 'auth_token'; // Ключ для токена в localStorage

  constructor(private http: HttpClient) {}

  // Получаем статистику посещений
  getStats(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getAuthHeaders() // Добавляем заголовки с токеном для авторизации
    });
  }

  // Получаем авторизационные заголовки с токеном
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }
}
