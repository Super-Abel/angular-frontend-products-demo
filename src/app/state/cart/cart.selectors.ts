import { Observable, map } from 'rxjs';
import { Store } from '../../core/store/store';
import { CartState } from './cart.reducer';
import { inject } from '@angular/core';

export class CartSelectors {
  private store = inject(Store);

  selectCartState(): Observable<CartState> {
    return this.store.select('cart');
  }

  selectCartItems(): Observable<any[]> {
    return this.selectCartState().pipe(map((state) => state?.items || []));
  }

  selectCartTotal(): Observable<number> {
    return this.selectCartState().pipe(map((state) => state?.total || 0));
  }

  selectCartItemCount(): Observable<number> {
    return this.selectCartState().pipe(map((state) => state?.itemCount || 0));
  }

  selectCartItem(productId: number): Observable<any | undefined> {
    return this.selectCartItems().pipe(map((items) => items.find((item) => item.id === productId)));
  }
}
