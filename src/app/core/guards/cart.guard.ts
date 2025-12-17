import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Store } from '../store/store';
import { map } from 'rxjs';
import { selectCartItems } from '../../state/cart/cart.selectors';

export const cartGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return selectCartItems(store.getState$()).pipe(
    map((items) => {
      if (items.length === 0) {
        router.navigate(['/shop/cart']);
        return false;
      }
      return true;
    })
  );
};
