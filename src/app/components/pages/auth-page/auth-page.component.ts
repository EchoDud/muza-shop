import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'], 
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent],
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
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.message = ''; // Очистим сообщение при переключении режима
  }

  submit() {
    const { email, password } = this.authForm.value;
    if (this.isRegisterMode) {
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

  goToHome() {
    this.router.navigate(['/']);
  }
}
