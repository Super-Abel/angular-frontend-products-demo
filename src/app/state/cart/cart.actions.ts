import { Action } from '../../core/store/store';

export enum CartActions {
  ADD_TO_CART = '[Cart] Add to Cart',
  REMOVE_FROM_CART = '[Cart] Remove from Cart',
  UPDATE_QUANTITY = '[Cart] Update Quantity',
  CLEAR_CART = '[Cart] Clear Cart',
  LOAD_CART = '[Cart] Load Cart from Storage',
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export const addToCart = (product: Omit<CartItem, 'quantity'>, quantity = 1): Action => ({
  type: CartActions.ADD_TO_CART,
  payload: { product, quantity },
});

export const removeFromCart = (productId: number): Action => ({
  type: CartActions.REMOVE_FROM_CART,
  payload: productId,
});

export const updateQuantity = (productId: number, quantity: number): Action => ({
  type: CartActions.UPDATE_QUANTITY,
  payload: { productId, quantity },
});

export const clearCart = (): Action => ({
  type: CartActions.CLEAR_CART,
});

export const loadCart = (items: CartItem[]): Action => ({
  type: CartActions.LOAD_CART,
  payload: items,
});
