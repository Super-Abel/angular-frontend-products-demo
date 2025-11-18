import { Observable, map } from 'rxjs';
import { AuthState } from '../../core/models/auth.models';

export const selectAuthState = (state$: Observable<any>): Observable<AuthState> =>
  state$.pipe(map((state) => state.auth));

export const selectIsAuthenticated = (state$: Observable<any>): Observable<boolean> =>
  state$.pipe(map((state) => state.auth?.isAuthenticated || false));

export const selectAccessToken = (state$: Observable<any>): Observable<string | null> =>
  state$.pipe(map((state) => state.auth?.access || null));

export const selectAuthLoading = (state$: Observable<any>): Observable<boolean> =>
  state$.pipe(map((state) => state.auth?.loading || false));

export const selectAuthError = (state$: Observable<any>): Observable<string | null> =>
  state$.pipe(map((state) => state.auth?.error || null));
