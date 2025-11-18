import { Injectable, inject } from '@angular/core';
import { Store } from '../../core/store/store';
import { ShopApiService } from '../../core/services/shop-api.service';
import {
  ProductsActions,
  loadProductsSuccess,
  loadProductsFailure,
  loadRatingSuccess,
  loadRatingFailure,
} from './products.actions';

@Injectable({
  providedIn: 'root',
})
export class ProductsEffects {
  private store = inject(Store);
  private api = inject(ShopApiService);

  constructor() {
    this.setupEffects();
  }

  private setupEffects(): void {
    const originalDispatch = this.store.dispatch.bind(this.store);
    this.store.dispatch = (action: any) => {
      originalDispatch(action);

      if (action.type === ProductsActions.LOAD_PRODUCTS) {
        this.handleLoadProducts(action.payload);
      } else if (action.type === ProductsActions.LOAD_RATING) {
        this.handleLoadRating(action.payload);
      }
    };
  }

  private handleLoadProducts(filters: any): void {
    const state = this.store.getState();
    const currentFilters = state.products?.filters || {};
    const mergedFilters = { ...currentFilters, ...filters };

    this.api.getProducts(mergedFilters).subscribe({
      next: (response) => {
        this.store.dispatch(loadProductsSuccess(response));
      },
      error: (error) => {
        const message = error?.error?.detail || error?.message || 'Failed to load products';
        this.store.dispatch(loadProductsFailure(message));
      },
    });
  }

  private handleLoadRating(productId: number): void {
    this.api.getProductRating(productId).subscribe({
      next: (response) => {
        this.store.dispatch(loadRatingSuccess(response));
      },
      error: (error) => {
        const message = error?.error?.detail || error?.message || 'Failed to load rating';
        this.store.dispatch(loadRatingFailure(message));
      },
    });
  }
}
