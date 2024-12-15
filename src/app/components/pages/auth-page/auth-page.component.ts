import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
})
export class AuthPageComponent {
  authForm: FormGroup;
  isRegisterMode = false;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar // Внедрение MatSnackBar
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.message = '';
  }

  submit() {
    if (this.authForm.invalid) {
      return; // Если форма невалидна, не отправляем запрос
    }
  
    const { email, password } = this.authForm.value;
  
    if (this.isRegisterMode) {
      // Регистрация
      this.authService.register(email, password).subscribe({
        next: () => {
          this.snackBar.open('Регистрация успешна. Теперь войдите.', 'Закрыть', { duration: 5000 });
          this.isRegisterMode = false;
        },
        error: () => {
          this.snackBar.open('Ошибка регистрации. Попробуйте снова.', 'Закрыть', { duration: 5000 });
        },
      });
    } else {
      // Вход
      this.authService.login(email, password).subscribe({
        next: () => {
          this.snackBar.open('Успешный вход!', 'Закрыть', { duration: 5000 });
          this.router.navigate(['/']); // Возврат на главную
        },
        error: () => {
          this.snackBar.open('Ошибка входа. Проверьте данные.', 'Закрыть', { duration: 5000 });
        },
      });
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  openSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Закрыть', {
      duration: 5000,
      panelClass: type === 'success' ? ['snack-bar-success'] : ['snack-bar-error'],
    });
  }
}
