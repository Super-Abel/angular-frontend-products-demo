import { Routes } from '@angular/router';
import { DevIndexComponent } from './dev/dev-index.component';
import { DevAuthComponent } from './dev/dev-auth.component';
import { DevProductsComponent } from './dev/dev-products.component';
import { DevProductRatingComponent } from './dev/dev-product-rating.component';
import { AppPlaceholderComponent } from './app-placeholder.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  { path: 'dev', component: DevIndexComponent },
  { path: 'dev/auth', component: DevAuthComponent },
  { path: 'dev/products', component: DevProductsComponent },
  { path: 'dev/products/:id/rating', component: DevProductRatingComponent },
  { path: 'login', component: LoginComponent },

  // Shop module (lazy) - avec layout client
  {
    path: 'shop',
    loadComponent: () => import('./layouts/client-layout/client-layout.component').then((m) => m.ClientLayoutComponent),
    loadChildren: () => import('./modules/shop/shop.routes').then((m) => m.SHOP_ROUTES),
  },

  // Account module (lazy) - avec layout client
  {
    path: 'account',
    loadComponent: () => import('./layouts/client-layout/client-layout.component').then((m) => m.ClientLayoutComponent),
    loadChildren: () => import('./modules/account/account.routes').then((m) => m.ACCOUNT_ROUTES),
  },

  // Admin module (lazy) - avec layout admin
  {
    path: 'admin',
    loadComponent: () => import('./layouts/admin-layout/admin-layout.component').then((m) => m.AdminLayoutComponent),
    loadChildren: () => import('./modules/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },

  // Legacy routes (backward compat)
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },

  { path: '**', redirectTo: '' },
];
