import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css'],
  imports: [CommonModule, RouterModule, MatMenuModule, MatButtonModule],
})
export class UserDropdownComponent {
  user$ = this.authService.user$; // Текущий пользователь

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  goOrderHistory() {
    this.router.navigate(['/order-history']);
  }

  goAdminPanel() {
    this.router.navigate(['/admin-panel']);
  }

  isAdmin(user: { role: string | null }): boolean {
    return user.role === 'Admin'; // Проверка роли пользователя
  }
}
