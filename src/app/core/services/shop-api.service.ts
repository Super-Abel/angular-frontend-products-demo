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
}
