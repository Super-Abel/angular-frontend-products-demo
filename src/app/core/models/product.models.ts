export interface Product {
  id: number;
  name: string;
  price: number;
  created_at: string;
  ratings?: Rating[];
}

export interface Rating {
  id: number;
  value: number;
  comment?: string;
}

export interface ProductRating {
  product_id: number;
  avg_rating: number;
  count: number;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ProductsState {
  products: Product[];
  count: number;
  loading: boolean;
  error: string | null;
  filters: ProductFilters;
  selectedRating: ProductRating | null;
  ratingLoading: boolean;
}

export interface ProductFilters {
  page: number;
  pageSize: number;
  minRating: number;
  ordering: string;
}
