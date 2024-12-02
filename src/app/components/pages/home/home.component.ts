import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { RouterModule } from '@angular/router';
import { FiltersComponent } from '../../filters/filters.component';
import { ProductListComponent } from '../../product-list/product-list.component';
import { FilterStateService } from '../../../shared/services/filter-state.service';
import { Product } from '../../../shared/models/product.model';
import { MockProductApiClientService } from '../../../shared/services/mock-product-api-client.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ HeaderComponent, RouterModule, FiltersComponent, ProductListComponent ],
})
export class HomeComponent {
  availableBrands: string[] = [];
  products: Product[] = [];

  constructor(private productApiClient: MockProductApiClientService) {}

  async ngOnInit(): Promise<void> {
    this.products = await this.productApiClient.getProducts();
    this.availableBrands = [...new Set(this.products.map((p) => p.brand))];
    console.log('Available brands:', this.availableBrands);
  }

  onApplyFilters() {
    console.log('Filters applied');
  }
}
