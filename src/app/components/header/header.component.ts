import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesDropdownComponent } from '../categories-dropdown/categories-dropdown.component';
import { UserDropdownComponent } from '../user-dropdown/user-dropdown.component';
import { Router } from '@angular/router';
import { FilterStateService } from '../../shared/services/filter-state.service';
import { AuthService } from '../../shared/services/auth.service';  // Импортируем AuthService
import { MatDialog } from '@angular/material/dialog';  // Импортируем MatDialog
import { AuthDialogComponent } from '../../auth-dialog/auth-dialog.component'; // Импортируем компонент диалога авторизации

import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, CategoriesDropdownComponent, SearchComponent, UserDropdownComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private filterStateService: FilterStateService,
    private authService: AuthService,  // Инжектируем AuthService
    private dialog: MatDialog  // Инжектируем MatDialog
  ) {}

  goToCart() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/cart']);  // Если авторизован, переходим в корзину
    } else {
      this.openAuthDialog();  // Если не авторизован, открываем диалог авторизации
    }
  }

  goToBuy() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/buy']);  // Если авторизован, переходим на страницу покупки
    } else {
      this.openAuthDialog();  // Если не авторизован, открываем диалог авторизации
    }
  }

  goToHomePage() {
    // Сбрасываем фильтры
    this.filterStateService.resetFilters();

    // Переходим на главную страницу
    this.router.navigate(['/']);
  }

  // Метод для открытия диалога авторизации
  private openAuthDialog() {
    const dialogRef = this.dialog.open(AuthDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'auth') {
        this.router.navigate(['/auth']);  // Переход на страницу логина
      } 
    });
  }
}
