import { Action } from '../../core/store/store';
import {
  Paginated,
  Product,
  ProductFilters,
  ProductRating,
} from '../../core/models/product.models';

export const ProductsActions = {
  LOAD_PRODUCTS: '[Products] Load Products',
  LOAD_PRODUCTS_SUCCESS: '[Products] Load Products Success',
  LOAD_PRODUCTS_FAILURE: '[Products] Load Products Failure',
  UPDATE_FILTERS: '[Products] Update Filters',
  LOAD_RATING: '[Products] Load Rating',
  LOAD_RATING_SUCCESS: '[Products] Load Rating Success',
  LOAD_RATING_FAILURE: '[Products] Load Rating Failure',
};

export const loadProducts = (filters: Partial<ProductFilters>): Action => ({
  type: ProductsActions.LOAD_PRODUCTS,
  payload: filters,
});

export const loadProductsSuccess = (data: Paginated<Product>): Action => ({
  type: ProductsActions.LOAD_PRODUCTS_SUCCESS,
  payload: data,
});

export const loadProductsFailure = (error: string): Action => ({
  type: ProductsActions.LOAD_PRODUCTS_FAILURE,
  payload: error,
});

export const updateFilters = (filters: Partial<ProductFilters>): Action => ({
  type: ProductsActions.UPDATE_FILTERS,
  payload: filters,
});

export const loadRating = (productId: number): Action => ({
  type: ProductsActions.LOAD_RATING,
  payload: productId,
});

export const loadRatingSuccess = (rating: ProductRating): Action => ({
  type: ProductsActions.LOAD_RATING_SUCCESS,
  payload: rating,
});

export const loadRatingFailure = (error: string): Action => ({
  type: ProductsActions.LOAD_RATING_FAILURE,
  payload: error,
});
