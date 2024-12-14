import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'], 
  imports: [ReactiveFormsModule, CommonModule],
})
export class AuthPageComponent {
  authForm: FormGroup;
  isRegisterMode = false; // Определяет текущий режим (вход или регистрация)
  message: string = '';  // Сообщение об операции

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Создаем форму с валидацией
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Переключение между режимами (вход и регистрация)
  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.message = ''; // Очистим сообщение при переключении режима
  }

  // Отправка формы
  submit() {
    if (this.authForm.invalid) {
      return; // Если форма невалидна, не отправляем запрос
    }

    const { email, password } = this.authForm.value;

    if (this.isRegisterMode) {
      // Регистрация
      this.authService.register(email, password).subscribe({
        next: () => {
          this.message = 'Регистрация успешна. Теперь войдите.';
          this.isRegisterMode = false;
        },
        error: () => {
          this.message = 'Ошибка регистрации. Попробуйте снова.';
        },
      });
    } else {
      // Вход
      this.authService.login(email, password).subscribe({
        next: () => {
          this.message = '';
          this.router.navigate(['/']); // Возврат на главную
        },
        error: () => {
          this.message = 'Ошибка входа. Проверьте данные.';
        },
      });
    }
  }

  // Переход на главную
  goToHome() {
    this.router.navigate(['/']);
  }
}
