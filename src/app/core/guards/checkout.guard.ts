import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Store } from '../store/store';
import { map } from 'rxjs';

export const checkoutGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select('cart').pipe(
    map((cartState: any) => {
      const items = cartState?.items || [];

      // Panier vide
      if (items.length === 0) {
        router.navigate(['/shop/cart']);
        return false;
      }

      return true;
    }),
  );
};
