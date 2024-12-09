import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5000/api/auth';
  private tokenKey = 'auth_token';
  private userSubject = new BehaviorSubject<string | null>(null);

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
      if (payload && payload.email) {
        this.userSubject.next(payload.email);
      } else {
        console.error('Invalid token payload');
        this.userSubject.next(null);
      }
    } catch (e) {
      console.error('Invalid token format', e);
      this.userSubject.next(null);
    }
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
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
