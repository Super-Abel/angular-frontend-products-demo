import { AuthState } from '../../core/models/auth.models';
import { Action } from '../../core/store/store';
import { AuthActions } from './auth.actions';

export const initialAuthState: AuthState = {
  access: null,
  refresh: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export function authReducer(state: AuthState = initialAuthState, action: Action): AuthState {
  switch (action.type) {
    case AuthActions.LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        access: action.payload.access,
        refresh: action.payload.refresh,
        loading: false,
        error: null,
        isAuthenticated: true,
      };

    case AuthActions.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case AuthActions.REFRESH_TOKEN:
      return {
        ...state,
        loading: true,
      };

    case AuthActions.REFRESH_SUCCESS:
      return {
        ...state,
        access: action.payload,
        loading: false,
        error: null,
      };

    case AuthActions.REFRESH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case AuthActions.LOGOUT:
      return initialAuthState;

    default:
      return state;
  }
}
