import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';
import { AuthPageComponent } from './components/pages/auth-page/auth-page.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductPageComponent },
  { path: 'auth', component: AuthPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
