import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../../pages/admin/dashboard/dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
  },
];
