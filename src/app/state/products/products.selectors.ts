import { Observable, map } from 'rxjs';
import { Product, ProductFilters, ProductRating, ProductsState } from '../../core/models/product.models';

export const selectProductsState = (state$: Observable<any>): Observable<ProductsState> =>
  state$.pipe(map((state) => state.products));

export const selectProducts = (state$: Observable<any>): Observable<Product[]> =>
  state$.pipe(map((state) => state.products?.products || []));

export const selectProductsCount = (state$: Observable<any>): Observable<number> =>
  state$.pipe(map((state) => state.products?.count || 0));

export const selectProductsLoading = (state$: Observable<any>): Observable<boolean> =>
  state$.pipe(map((state) => state.products?.loading || false));

export const selectProductsError = (state$: Observable<any>): Observable<string | null> =>
  state$.pipe(map((state) => state.products?.error || null));

export const selectProductFilters = (state$: Observable<any>): Observable<ProductFilters> =>
  state$.pipe(map((state) => state.products?.filters));

export const selectSelectedRating = (state$: Observable<any>): Observable<ProductRating | null> =>
  state$.pipe(map((state) => state.products?.selectedRating || null));

export const selectRatingLoading = (state$: Observable<any>): Observable<boolean> =>
  state$.pipe(map((state) => state.products?.ratingLoading || false));
