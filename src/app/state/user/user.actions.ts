import { Action } from '../../core/store/store';

export interface Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface OrderSummary {
  id: string;
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  defaultAddress?: Address;
  preferences: {
    newsletter: boolean;
    defaultMinRating?: number;
  };
  orders: OrderSummary[];
  wishlistProductIds: number[];
}

export enum UserActions {
  LOAD_USER = '[User] Load User',
  LOAD_USER_SUCCESS = '[User] Load User Success',
  LOAD_USER_FAILURE = '[User] Load User Failure',
  UPDATE_USER = '[User] Update User',
  UPDATE_USER_SUCCESS = '[User] Update User Success',
  UPDATE_USER_FAILURE = '[User] Update User Failure',
  LOAD_ORDERS = '[User] Load Orders',
  LOAD_ORDERS_SUCCESS = '[User] Load Orders Success',
  LOAD_ORDERS_FAILURE = '[User] Load Orders Failure',
  TOGGLE_WISHLIST = '[User] Toggle Wishlist',
  LOAD_WISHLIST = '[User] Load Wishlist',
}

export const loadUser = (): Action => ({ type: UserActions.LOAD_USER });
export const loadUserSuccess = (user: User): Action => ({
  type: UserActions.LOAD_USER_SUCCESS,
  payload: user,
});
export const loadUserFailure = (error: string): Action => ({
  type: UserActions.LOAD_USER_FAILURE,
  payload: error,
});

export const updateUser = (updates: Partial<User>): Action => ({
  type: UserActions.UPDATE_USER,
  payload: updates,
});
export const updateUserSuccess = (user: User): Action => ({
  type: UserActions.UPDATE_USER_SUCCESS,
  payload: user,
});
export const updateUserFailure = (error: string): Action => ({
  type: UserActions.UPDATE_USER_FAILURE,
  payload: error,
});

export const loadOrders = (): Action => ({ type: UserActions.LOAD_ORDERS });
export const loadOrdersSuccess = (orders: OrderSummary[]): Action => ({
  type: UserActions.LOAD_ORDERS_SUCCESS,
  payload: orders,
});
export const loadOrdersFailure = (error: string): Action => ({
  type: UserActions.LOAD_ORDERS_FAILURE,
  payload: error,
});

export const toggleWishlist = (productId: number): Action => ({
  type: UserActions.TOGGLE_WISHLIST,
  payload: productId,
});

export const loadWishlist = (productIds: number[]): Action => ({
  type: UserActions.LOAD_WISHLIST,
  payload: productIds,
});
