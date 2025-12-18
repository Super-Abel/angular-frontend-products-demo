import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Store } from '../store/store';
import { map } from 'rxjs';

export const cartGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select('cart').pipe(
    map((cartState: any) => {
      const items = cartState?.items || [];
      if (items.length === 0) {
        router.navigate(['/shop/cart']);
        return false;
      }
      return true;
    }),
  );
};
