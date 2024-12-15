import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5000/api/auth';
  private tokenKey = 'auth_token';
  private userSubject = new BehaviorSubject<{ email: string | null; role: string | null }>({ email: null, role: null });

  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.setUserFromToken(token);
    }
  }

  private setUserFromToken(token: string) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Декодируем payload токена
      if (payload && payload.email && payload.role) {
        this.userSubject.next({ email: payload.email, role: payload.role }); // Сохраняем и email, и роль
      } else {
        console.error('Invalid token payload');
        this.userSubject.next({ email: null, role: null });
      }
    } catch (e) {
      console.error('Invalid token format', e);
      this.userSubject.next({ email: null, role: null });
    }
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.setUserFromToken(response.token);
      }),
      catchError((error) => {
        console.error('Login failed', error);
        return throwError(() => error);
      })
    );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password }).pipe(
      catchError((error) => {
        console.error('Registration failed', error);
        return throwError(() => error);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next({ email: null, role: null }); // Сбрасываем данные пользователя
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // Методы управления пользователями
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError((error) => {
        console.error('Failed to fetch users', error);
        return throwError(() => error);
      })
    );
  }

  addUser(user: { email: string; password: string; role: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, user, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError((error) => {
        console.error('Failed to add user', error);
        return throwError(() => error);
      })
    );
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${userId}`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      catchError((error) => {
        console.error('Failed to delete user', error);
        return throwError(() => error);
      })
    );
  }
}