import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';
import { AuthPageComponent } from './components/pages/auth-page/auth-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { OrderHistoryPageComponent } from './components/pages/order-history-page/order-history-page.component';
import { AdminPanelComponent } from './components/pages/admin-panel/admin-panel.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductPageComponent },
  { path: 'auth', component: AuthPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'order-history', component: OrderHistoryPageComponent },
  {path: 'admin-panel', component: AdminPanelComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },

];
