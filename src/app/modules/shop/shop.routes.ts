import { Routes } from '@angular/router';

export const SHOP_ROUTES: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('../../pages/products/products.component').then((m) => m.ProductsComponent),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('../../pages/product-details/product-details.component').then((m) => m.ProductDetailsComponent),
  },
  {
    path: 'rating',
    loadComponent: () =>
      import('../../pages/product-rating/product-rating.component').then(
        (m) => m.ProductRatingComponent
      ),
  },
  {
    path: 'cart',
    loadComponent: () => import('../../pages/cart/cart').then((m) => m.Cart),
  },
  {
    path: 'checkout',
    loadComponent: () => import('../../pages/checkout/checkout').then((m) => m.Checkout),
  },
];
