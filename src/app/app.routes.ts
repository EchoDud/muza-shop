import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';
import { AuthPageComponent } from './components/pages/auth-page/auth-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';


export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductPageComponent },
  { path: 'auth', component: AuthPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
