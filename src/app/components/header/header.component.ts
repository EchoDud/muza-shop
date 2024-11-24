import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesDropdownComponent } from '../categories-dropdown/categories-dropdown.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, CategoriesDropdownComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {}
