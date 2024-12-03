import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // Главная страница
  { path: 'product/:id', component: ProductPageComponent }, // Страница товара
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Перенаправление на главную для неизвестных маршрутов
];
