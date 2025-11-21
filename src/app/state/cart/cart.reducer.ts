import { Action, Reducer } from '../../core/store/store';
import { CartActions, CartItem } from './cart.actions';

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

export const cartReducer: Reducer<CartState> = (
  state: CartState = initialState,
  action: Action
): CartState => {
  switch (action.type) {
    case CartActions.ADD_TO_CART: {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === product.id);

      let newItems: CartItem[];
      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { ...product, quantity }];
      }

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    }

    case CartActions.REMOVE_FROM_CART: {
      const productId = action.payload;
      const newItems = state.items.filter((item) => item.id !== productId);

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    }

    case CartActions.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;

      if (quantity <= 0) {
        const newItems = state.items.filter((item) => item.id !== productId);
        return {
          ...state,
          items: newItems,
          total: calculateTotal(newItems),
          itemCount: calculateItemCount(newItems),
        };
      }

      const newItems = state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    }

    case CartActions.CLEAR_CART: {
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
      };
    }

    case CartActions.LOAD_CART: {
      const items = action.payload || [];
      return {
        ...state,
        items,
        total: calculateTotal(items),
        itemCount: calculateItemCount(items),
      };
    }

    default:
      return state;
  }
};
