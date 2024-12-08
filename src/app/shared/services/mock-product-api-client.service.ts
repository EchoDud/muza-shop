import { Injectable } from '@angular/core';
import { ProductApiClient } from './product-api-client.interface';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class MockProductApiClienttService implements ProductApiClient {
  private products: Product[] = [
    // Струнные
  { id: 1, brand: 'Fender', model: 'Player Stratocaster', color: 'Sunburst', description: 'Идеальный выбор для начинающих и профессионалов.', price: 120000, imageUrl: 'https://images.musicstore.de/images/1280/fender-player-plus-stratocaster-hss-mn-3-color-sunburst_1_GIT0056958-000.jpg', categoryId: 3 },
  { id: 2, brand: 'Gibson', model: 'Les Paul Standard', color: 'Cherry', description: 'Классика рока.', price: 150000, imageUrl: '', categoryId: 3 },
  { id: 3, brand: 'Yamaha', model: 'FG800', color: 'Natural', description: 'Акустическая гитара с отличным звучанием.', price: 25000, imageUrl: '', categoryId: 4 },
  { id: 4, brand: 'Ibanez', model: 'SR300E', color: 'Metallic Gray', description: 'Бас-гитара для всех жанров.', price: 70000, imageUrl: '', categoryId: 5 },
  { id: 5, brand: 'Stradivarius', model: 'Concert Violin', color: 'Brown', description: 'Скрипка для профессиональных музыкантов.', price: 450000, imageUrl: '', categoryId: 7 },

  // Ударные
  { id: 6, brand: 'Tama', model: 'Imperialstar', color: 'Black', description: 'Полный комплект барабанов для начинающих.', price: 85000, imageUrl: '', categoryId: 11 },
  { id: 7, brand: 'Zildjian', model: 'K Custom', color: 'Brilliant', description: 'Профессиональные тарелки.', price: 50000, imageUrl: '', categoryId: 12 },
  { id: 8, brand: 'Roland', model: 'TD-17KV', color: 'Black', description: 'Электронные ударные установки с реальным звучанием.', price: 220000, imageUrl: '', categoryId: 13 },

  // Клавишные
  { id: 9, brand: 'Yamaha', model: 'P-125', color: 'Black', description: 'Компактное цифровое пианино.', price: 45000, imageUrl: '', categoryId: 17 },
  { id: 10, brand: 'Casio', model: 'CT-X700', color: 'White', description: 'Синтезатор с богатым функционалом.', price: 25000, imageUrl: '', categoryId: 16 },
  { id: 11, brand: 'Korg', model: 'B2SP', color: 'White', description: 'Электронное пианино с педалями.', price: 50000, imageUrl: '', categoryId: 15 },

  // Духовые
  { id: 12, brand: 'Yamaha', model: 'YTR-2330', color: 'Gold', description: 'Труба начального уровня.', price: 45000, imageUrl: '', categoryId: 19 },
  { id: 13, brand: 'Selmer', model: 'Mark VI', color: 'Gold', description: 'Легендарный саксофон для джаза.', price: 400000, imageUrl: '', categoryId: 20 },
  { id: 14, brand: 'Pearl', model: 'Quantz', color: 'Silver', description: 'Флейта с великолепным звучанием.', price: 90000, imageUrl: '', categoryId: 21 },

  // Аксессуары
  { id: 15, brand: 'Gator', model: 'Guitar Case', color: 'Black', description: 'Прочный чехол для гитар.', price: 6000, imageUrl: '', categoryId: 23 },
  { id: 16, brand: 'D\'Addario', model: 'EXL120', color: 'Nickel Wound', description: 'Струны для электрогитары.', price: 800, imageUrl: '', categoryId: 24 },
  { id: 17, brand: 'Fender', model: 'Medium Picks', color: 'Variety', description: 'Набор медиаторов.', price: 500, imageUrl: '', categoryId: 25 },
  { id: 18, brand: 'Hercules', model: 'Guitar Stand', color: 'Black', description: 'Прочная стойка для гитары.', price: 3000, imageUrl: '', categoryId: 26 },

  // Оборудование
  { id: 19, brand: 'Marshall', model: 'MG15G', color: 'Black', description: 'Компактный комбоусилитель для электрогитары.', price: 15000, imageUrl: '', categoryId: 28 },
  { id: 20, brand: 'Shure', model: 'SM58', color: 'Silver', description: 'Легендарный вокальный микрофон.', price: 12000, imageUrl: '', categoryId: 29 },
  { id: 21, brand: 'Yamaha', model: 'MG10XU', color: 'Black', description: 'Компактный микшерный пульт.', price: 25000, imageUrl: '', categoryId: 30 },
];

  async getProducts(): Promise<Product[]> {
    return this.products;
  }

  getProductById(id: number): Promise<Product | null> {
    const product = this.products.find((p) => p.id === id);
    return Promise.resolve(product || null);
  }
}
