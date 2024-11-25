import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { RouterModule } from '@angular/router';
import { FiltersComponent } from '../../filters/filters.component';
import { ProductListComponent } from '../../product-list/product-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ HeaderComponent, RouterModule, FiltersComponent, ProductListComponent ],
})
export class HomeComponent {}
