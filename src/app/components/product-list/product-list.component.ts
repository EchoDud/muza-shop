import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockProductApiClientService } from '../../shared/services/mock-product-api-client.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productApiClient: MockProductApiClientService) {}

  async ngOnInit(): Promise<void> {
    this.products = await this.productApiClient.getProducts();
  }

  onProductClick(product: Product): void {
    console.log('Товар выбран:', product);
    // Здесь можно реализовать переход на страницу товара:
    // this.router.navigate(['/product', product.id]);
  }

  onBuyClick(product: Product): void {
    console.log('Купить товар:', product);
    // Логика покупки товара
  }
}
