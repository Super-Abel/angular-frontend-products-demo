import { Routes } from '@angular/router';

export const ACCOUNT_ROUTES: Routes = [
  {
    path: 'profile',
    loadComponent: () =>
      import('../../pages/account/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('../../pages/account/orders/orders.component').then((m) => m.OrdersComponent),
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('../../pages/account/order-detail/order-detail.component').then(
        (m) => m.OrderDetailComponent,
      ),
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('../../pages/wishlist/wishlist.component').then((m) => m.WishlistComponent),
  },
];
