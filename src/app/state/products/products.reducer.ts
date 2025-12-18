import { ProductsState } from '../../core/models/product.models';
import { Action } from '../../core/store/store';
import { ProductsActions } from './products.actions';

export const initialProductsState: ProductsState = {
  products: [],
  count: 0,
  loading: false,
  error: null,
  filters: {
    page: 1,
    pageSize: 10,
    minRating: 0,
    ordering: '-created_at',
  },
  selectedRating: null,
  ratingLoading: false,
};

export function productsReducer(
  state: ProductsState = initialProductsState,
  action: Action,
): ProductsState {
  switch (action.type) {
    case ProductsActions.LOAD_PRODUCTS:
      return {
        ...state,
        loading: state.products.length === 0, // Don't show loading if cache exists
        error: null,
      };

    case ProductsActions.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.results,
        count: action.payload.count,
        loading: false,
        error: null,
      };

    case ProductsActions.LOAD_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ProductsActions.UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };

    case ProductsActions.LOAD_RATING:
      return {
        ...state,
        ratingLoading: true,
        selectedRating: null,
      };

    case ProductsActions.LOAD_RATING_SUCCESS:
      return {
        ...state,
        selectedRating: action.payload,
        ratingLoading: false,
      };

    case ProductsActions.LOAD_RATING_FAILURE:
      return {
        ...state,
        ratingLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
