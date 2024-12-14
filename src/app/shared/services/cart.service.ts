import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../models/cart-item.model';
import { AuthService } from './auth.service';  // Предполагаем, что у вас есть такой сервис

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly apiUrl = 'http://localhost:5000/api/cart';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Получение токена из AuthService
  private getAuthToken(): string | null {
    return this.authService.isAuthenticated() ? localStorage.getItem('auth_token') : null;
  }

  // Добавление заголовков с токеном для всех запросов
  private getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Получение списка товаров в корзине
  getCartItems(): Observable<CartItem[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      map((orders) => {
        console.log('Received orders:', orders); // Логирование данных, которые приходят с сервера
        return orders.map((order) => ({
          id: order.id,
          productId: order.productId,
          name: order.brand + order.model,
          price: order.price,
          quantity: order.count,
          status: order.status,
        }));
      })
    );
  }

  // Увеличение количества товара
  incrementItem(productId: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.post<void>(`${this.apiUrl}/${productId}/increment`, {}, { headers });
  }

  // Уменьшение количества товара
  decrementItem(productId: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.post<void>(`${this.apiUrl}/${productId}/decrement`, {}, { headers });
  }

  // Удаление товара из корзины
  removeItem(productId: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${productId}`, { headers });
  }

  // Операция оплаты
  checkout(): Observable<void> {
    const headers = this.getHeaders();
    return this.http.post<void>(`${this.apiUrl}/checkout`, {}, { headers });
  }

  // Получение истории заказов
  getOrderHistory(): Observable<CartItem[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/history`, { headers }).pipe(
      map((orders) => {
        console.log('Received order history:', orders); // Логирование данных, которые приходят с сервера
        return orders.map((order) => ({
          id: order.id,
          productId: order.productId,
          name: order.brand + ' ' + order.model, // Собираем название
          price: order.price,
          quantity: order.count,
          status: order.status,
          createdDate: order.createdDate,
        }));
      })
    );
  }

}
