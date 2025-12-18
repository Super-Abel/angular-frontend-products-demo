import { Action, Reducer } from '../../core/store/store';
import { User, UserActions } from './user.actions';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer: Reducer<UserState> = (
  state: UserState = initialState,
  action: Action,
): UserState => {
  switch (action.type) {
    case UserActions.LOAD_USER:
      return { ...state, loading: true, error: null };
    case UserActions.LOAD_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case UserActions.LOAD_USER_FAILURE:
      return { ...state, error: action.payload, loading: false };

    case UserActions.UPDATE_USER:
      return { ...state, loading: true, error: null };
    case UserActions.UPDATE_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case UserActions.UPDATE_USER_FAILURE:
      return { ...state, error: action.payload, loading: false };

    case UserActions.LOAD_ORDERS_SUCCESS:
      return {
        ...state,
        user: state.user ? { ...state.user, orders: action.payload } : null,
      };

    case UserActions.TOGGLE_WISHLIST: {
      if (!state.user) return state;
      const productId = action.payload;
      const wishlist = state.user.wishlistProductIds;
      const newWishlist = wishlist.includes(productId)
        ? wishlist.filter((id) => id !== productId)
        : [...wishlist, productId];
      return {
        ...state,
        user: { ...state.user, wishlistProductIds: newWishlist },
      };
    }

    case UserActions.LOAD_WISHLIST:
      return {
        ...state,
        user: state.user ? { ...state.user, wishlistProductIds: action.payload } : null,
      };

    default:
      return state;
  }
};
