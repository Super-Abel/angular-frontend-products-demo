import { cartReducer, CartState } from '../../../app/state/cart/cart.reducer';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  loadCart,
} from '../../../app/state/cart/cart.actions';

describe('CartReducer', () => {
  const initialState: CartState = {
    items: [],
    total: 0,
    itemCount: 0,
  };

  it('should return initial state', () => {
    const action = { type: 'UNKNOWN' };
    const result = cartReducer(undefined as any, action);

    expect(result).toEqual(initialState);
  });

  describe('ADD_TO_CART', () => {
    it('should add new item to empty cart', () => {
      const product = { id: 1, name: 'Product 1', price: 10 };
      const action = addToCart(product, 2);
      const result = cartReducer(initialState, action);

      expect(result.items.length).toBe(1);
      expect(result.items[0]).toEqual({ ...product, quantity: 2 });
      expect(result.total).toBe(20);
      expect(result.itemCount).toBe(2);
    });

    it('should increment quantity if item already exists', () => {
      const product = { id: 1, name: 'Product 1', price: 10 };
      const stateWithItem: CartState = {
        items: [{ ...product, quantity: 2 }],
        total: 20,
        itemCount: 2,
      };
      const action = addToCart(product, 3);
      const result = cartReducer(stateWithItem, action);

      expect(result.items.length).toBe(1);
      expect(result.items[0].quantity).toBe(5);
      expect(result.total).toBe(50);
      expect(result.itemCount).toBe(5);
    });
  });

  describe('REMOVE_FROM_CART', () => {
    it('should remove item from cart', () => {
      const stateWithItems: CartState = {
        items: [
          { id: 1, name: 'Product 1', price: 10, quantity: 2 },
          { id: 2, name: 'Product 2', price: 15, quantity: 1 },
        ],
        total: 35,
        itemCount: 3,
      };
      const action = removeFromCart(1);
      const result = cartReducer(stateWithItems, action);

      expect(result.items.length).toBe(1);
      expect(result.items[0].id).toBe(2);
      expect(result.total).toBe(15);
      expect(result.itemCount).toBe(1);
    });
  });

  describe('UPDATE_QUANTITY', () => {
    it('should update item quantity', () => {
      const stateWithItem: CartState = {
        items: [{ id: 1, name: 'Product 1', price: 10, quantity: 2 }],
        total: 20,
        itemCount: 2,
      };
      const action = updateQuantity(1, 5);
      const result = cartReducer(stateWithItem, action);

      expect(result.items[0].quantity).toBe(5);
      expect(result.total).toBe(50);
      expect(result.itemCount).toBe(5);
    });

    it('should remove item if quantity is 0', () => {
      const stateWithItem: CartState = {
        items: [{ id: 1, name: 'Product 1', price: 10, quantity: 2 }],
        total: 20,
        itemCount: 2,
      };
      const action = updateQuantity(1, 0);
      const result = cartReducer(stateWithItem, action);

      expect(result.items.length).toBe(0);
      expect(result.total).toBe(0);
      expect(result.itemCount).toBe(0);
    });
  });

  describe('CLEAR_CART', () => {
    it('should clear all items from cart', () => {
      const stateWithItems: CartState = {
        items: [
          { id: 1, name: 'Product 1', price: 10, quantity: 2 },
          { id: 2, name: 'Product 2', price: 15, quantity: 1 },
        ],
        total: 35,
        itemCount: 3,
      };
      const action = clearCart();
      const result = cartReducer(stateWithItems, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('LOAD_CART', () => {
    it('should load cart items and recalculate totals', () => {
      const items = [
        { id: 1, name: 'Product 1', price: 10, quantity: 2 },
        { id: 2, name: 'Product 2', price: 20, quantity: 1 },
      ];
      const action = loadCart(items);
      const result = cartReducer(initialState, action);

      expect(result.items).toEqual(items);
      expect(result.total).toBe(40);
      expect(result.itemCount).toBe(3);
    });
  });
});
