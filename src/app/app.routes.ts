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
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dev', component: DevIndexComponent },
  { path: 'dev/auth', component: DevAuthComponent },
  { path: 'dev/products', component: DevProductsComponent },
  { path: 'dev/products/:id/rating', component: DevProductRatingComponent },
  { path: 'app', component: AppPlaceholderComponent },
  { path: 'login', component: LoginComponent },

  // Shop module (lazy)
  {
    path: 'shop',
    loadChildren: () => import('./modules/shop/shop.routes').then((m) => m.SHOP_ROUTES),
  },

  // Account module (lazy)
  {
    path: 'account',
    loadChildren: () => import('./modules/account/account.routes').then((m) => m.ACCOUNT_ROUTES),
  },

  // Admin module (lazy)
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },

  // Legacy routes (backward compat)
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },

  { path: '**', redirectTo: '' },
];
