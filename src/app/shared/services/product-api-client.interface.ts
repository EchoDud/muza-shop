import { Product } from '../models/product.model';

export interface ProductApiClient {
  getProducts(): Promise<Product[]>;
}