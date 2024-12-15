import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms'; // Добавьте этот импорт
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Добавьте сюда
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = ['id', 'email', 'role', 'actions'];
  userForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Client', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getAllUsers().subscribe({
      next: (users) => (this.users = users),
      error: (err) => this.snackBar.open('Ошибка загрузки пользователей', 'Закрыть', { duration: 3000 }),
    });
  }

  addUser(): void {
    if (this.userForm.invalid) return;

    const user = this.userForm.value;
    this.authService.addUser(user).subscribe({
      next: () => {
        this.loadUsers();
        this.snackBar.open('Пользователь успешно добавлен', 'Закрыть', { duration: 3000 });
        this.userForm.reset({ role: 'Client' });
      },
      error: () => this.snackBar.open('Ошибка при добавлении пользователя', 'Закрыть', { duration: 3000 }),
    });
  }

  deleteUser(id: number): void {
    this.authService.deleteUser(id).subscribe({
      next: () => {
        this.loadUsers();
        this.snackBar.open('Пользователь успешно удален', 'Закрыть', { duration: 3000 });
      },
      error: () => this.snackBar.open('Ошибка при удалении пользователя', 'Закрыть', { duration: 3000 }),
    });
  }
}
