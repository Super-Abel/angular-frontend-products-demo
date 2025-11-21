import { Injectable, inject } from '@angular/core';
import { Store } from '../../core/store/store';
import { CartActions, loadCart } from './cart.actions';

const CART_STORAGE_KEY = 'myshop_cart';

@Injectable({
  providedIn: 'root',
})
export class CartEffects {
  private store = inject(Store);

  constructor() {
    this.setupEffects();
    this.loadCartFromStorage();
  }

  private setupEffects(): void {
    const originalDispatch = this.store.dispatch.bind(this.store);
    this.store.dispatch = (action: any) => {
      originalDispatch(action);

      if (
        action.type === CartActions.ADD_TO_CART ||
        action.type === CartActions.REMOVE_FROM_CART ||
        action.type === CartActions.UPDATE_QUANTITY ||
        action.type === CartActions.CLEAR_CART
      ) {
        this.syncToStorage();
      }
    };
  }

  private loadCartFromStorage(): void {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const items = JSON.parse(storedCart);
        this.store.dispatch(loadCart(items));
      }
    } catch (error) {
      console.error('Failed to load cart from storage:', error);
    }
  }

  private syncToStorage(): void {
    try {
      setTimeout(() => {
        const state = this.store.getState();
        const cartState = state['cart'];
        if (cartState?.items) {
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState.items));
        }
      }, 0);
    } catch (error) {
      console.error('Failed to sync cart to storage:', error);
    }
  }
}
