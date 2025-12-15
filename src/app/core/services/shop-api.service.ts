import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenResponse, RefreshResponse, LoginCredentials } from '../models/auth.models';
import { Paginated, Product, ProductFilters, ProductRating } from '../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ShopApiService {
  private http = inject(HttpClient);

  login(credentials: LoginCredentials): Observable<TokenResponse> {
    return this.http.post<TokenResponse>('/api/auth/token/', credentials);
  }

  refreshToken(refreshToken: string): Observable<RefreshResponse> {
    return this.http.post<RefreshResponse>('/api/auth/token/refresh/', {
      refresh: refreshToken,
    });
  }

  getProducts(filters: ProductFilters): Observable<Paginated<Product>> {
    const params = new HttpParams()
      .set('page', filters.page.toString())
      .set('page_size', filters.pageSize.toString())
      .set('min_rating', filters.minRating.toString())
      .set('ordering', filters.ordering);

    return this.http.get<Paginated<Product>>('/api/products/', { params });
  }

  getProductRating(productId: number): Observable<ProductRating> {
    return this.http.get<ProductRating>(`/api/products/${productId}/rating/`);
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`/api/products/${productId}/`);
  }

  getProductReviews(productId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/products/${productId}/reviews/`);
  }

  postProductReview(
    productId: number,
    review: { rating: number; comment: string },
  ): Observable<any> {
    return this.http.post<any>(`/api/products/${productId}/reviews/`, review);
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  patch<T>(url: string, body: any): Observable<T> {
    return this.http.patch<T>(url, body);
  }
}
