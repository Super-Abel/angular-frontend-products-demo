import { Injectable } from '@angular/core';
import { Store } from '../../core/store/store';
import { UserActions, loadUserSuccess, loadUserFailure, updateUserSuccess, updateUserFailure, loadOrdersSuccess, loadWishlist } from './user.actions';
import { ShopApiService } from '../../core/services/shop-api.service';

const WISHLIST_STORAGE_KEY = 'myshop_wishlist';

@Injectable({ providedIn: 'root' })
export class UserEffects {
  constructor(
    private store: Store<any>,
    private api: ShopApiService
  ) {
    this.store.getState$().subscribe((state) => {
      const action = (state as any)._lastAction;
      if (!action) return;

      switch (action.type) {
        case UserActions.LOAD_USER:
          this.handleLoadUser();
          break;
        case UserActions.LOAD_USER_SUCCESS:
          this.store.dispatch({ type: UserActions.LOAD_ORDERS });
          break;
        case UserActions.UPDATE_USER:
          this.handleUpdateUser(action.payload);
          break;
        case UserActions.LOAD_ORDERS:
          this.handleLoadOrders();
          break;
        case UserActions.TOGGLE_WISHLIST:
          this.handleToggleWishlist();
          break;
      }
    });

    this.loadWishlistFromStorage();
  }

  private handleLoadUser() {
    this.api.get<any>('/api/me/').subscribe({
      next: (user) => this.store.dispatch(loadUserSuccess(user)),
      error: (err) => this.store.dispatch(loadUserFailure(err.message)),
    });
  }

  private handleUpdateUser(updates: any) {
    this.api.patch<any>('/api/me/', updates).subscribe({
      next: (user) => this.store.dispatch(updateUserSuccess(user)),
      error: (err) => this.store.dispatch(updateUserFailure(err.message)),
    });
  }

  private handleLoadOrders() {
    this.api.get<any>('/api/me/orders/').subscribe({
      next: (orders) => this.store.dispatch(loadOrdersSuccess(orders)),
      error: (err) => console.error(err),
    });
  }

  private handleToggleWishlist() {
    const state = this.store.getState();
    const wishlist = state.user?.user?.wishlistProductIds || [];
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }

  private loadWishlistFromStorage() {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (stored) {
      try {
        const ids = JSON.parse(stored);
        this.store.dispatch(loadWishlist(ids));
      } catch (e) {
        console.error('Failed to load wishlist', e);
      }
    }
  }
}
