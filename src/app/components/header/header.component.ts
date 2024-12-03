import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesDropdownComponent } from '../categories-dropdown/categories-dropdown.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, CategoriesDropdownComponent, SearchComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {}
