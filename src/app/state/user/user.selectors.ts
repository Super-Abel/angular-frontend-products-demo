import { Observable, map, distinctUntilChanged } from 'rxjs';
import { UserState } from './user.reducer';

export const selectUser = (state$: Observable<{ user: UserState }>) =>
  state$.pipe(
    map((state) => state.user.user),
    distinctUntilChanged(),
  );

export const selectUserLoading = (state$: Observable<{ user: UserState }>) =>
  state$.pipe(
    map((state) => state.user.loading),
    distinctUntilChanged(),
  );

export const selectUserOrders = (state$: Observable<{ user: UserState }>) =>
  state$.pipe(
    map((state) => state.user.user?.orders || []),
    distinctUntilChanged(),
  );

export const selectWishlist = (state$: Observable<{ user: UserState }>) =>
  state$.pipe(
    map((state) => state.user.user?.wishlistProductIds || []),
    distinctUntilChanged(),
  );

export const selectWishlistCount = (state$: Observable<{ user: UserState }>) =>
  state$.pipe(
    map((state) => state.user.user?.wishlistProductIds.length || 0),
    distinctUntilChanged(),
  );

export const isInWishlist = (productId: number) => (state$: Observable<{ user: UserState }>) =>
  state$.pipe(
    map((state) => state.user.user?.wishlistProductIds.includes(productId) || false),
    distinctUntilChanged(),
  );

// Memoized: orders by status
export const selectOrdersByStatus = (status: string) => (state$: Observable<{ user: UserState }>) =>
  state$.pipe(
    map((state) => (state.user.user?.orders || []).filter((o) => o.status === status)),
    distinctUntilChanged(),
  );
