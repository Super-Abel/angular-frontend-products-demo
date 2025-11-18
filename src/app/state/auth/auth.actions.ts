import { Action } from '../../core/store/store';
import { LoginCredentials, TokenResponse } from '../../core/models/auth.models';

export const AuthActions = {
  LOGIN: '[Auth] Login',
  LOGIN_SUCCESS: '[Auth] Login Success',
  LOGIN_FAILURE: '[Auth] Login Failure',
  REFRESH_TOKEN: '[Auth] Refresh Token',
  REFRESH_SUCCESS: '[Auth] Refresh Success',
  REFRESH_FAILURE: '[Auth] Refresh Failure',
  LOGOUT: '[Auth] Logout',
};

export const login = (credentials: LoginCredentials): Action => ({
  type: AuthActions.LOGIN,
  payload: credentials,
});

export const loginSuccess = (tokens: TokenResponse): Action => ({
  type: AuthActions.LOGIN_SUCCESS,
  payload: tokens,
});

export const loginFailure = (error: string): Action => ({
  type: AuthActions.LOGIN_FAILURE,
  payload: error,
});

export const refreshToken = (refreshToken: string): Action => ({
  type: AuthActions.REFRESH_TOKEN,
  payload: refreshToken,
});

export const refreshSuccess = (access: string): Action => ({
  type: AuthActions.REFRESH_SUCCESS,
  payload: access,
});

export const refreshFailure = (error: string): Action => ({
  type: AuthActions.REFRESH_FAILURE,
  payload: error,
});

export const logout = (): Action => ({
  type: AuthActions.LOGOUT,
});
