import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesDropdownComponent } from '../categories-dropdown/categories-dropdown.component';
import { UserDropdownComponent } from '../user-dropdown/user-dropdown.component';
import { Router } from '@angular/router';
import { FilterStateService } from '../../shared/services/filter-state.service';

import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, CategoriesDropdownComponent, SearchComponent, UserDropdownComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router, private filterStateService: FilterStateService) {}

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToHomePage() {
    // Сбрасываем фильтры
    this.filterStateService.resetFilters();

    // Переходим на главную страницу
    this.router.navigate(['/']);
  }
}
