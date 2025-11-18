import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductsListComponent } from '../../components/products-list/products-list.component';
import { Store } from '../../core/store/store';
import { Product, ProductFilters } from '../../core/models/product.models';
import { loadProducts, updateFilters } from '../../state/products/products.actions';
import {
  selectProducts,
  selectProductsCount,
  selectProductsLoading,
  selectProductsError,
  selectProductFilters,
} from '../../state/products/products.selectors';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ProductsListComponent],
  template: `
    <section class="mx-auto max-w-7xl px-4 py-8">
      <div class="mb-6 flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">Products</h1>
        <button
          type="button"
          routerLink="/app"
          class="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          ← Back
        </button>
      </div>

      <!-- Filters -->
      <div class="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h2 class="mb-4 text-lg font-semibold text-gray-900">Filters</h2>

        <form (submit)="$event.preventDefault(); applyFilters()" class="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Page
            </label>
            <input
              type="number"
              [(ngModel)]="filters.page"
              name="page"
              min="1"
              class="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Page Size
            </label>
            <input
              type="number"
              [(ngModel)]="filters.pageSize"
              name="pageSize"
              min="1"
              max="100"
              class="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Min Rating
            </label>
            <input
              type="number"
              [(ngModel)]="filters.minRating"
              name="minRating"
              min="0"
              max="5"
              step="0.1"
              class="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              [(ngModel)]="filters.ordering"
              name="ordering"
              class="w-full rounded-lg border border-gray-300 px-3 py-2"
            >
              <option value="-created_at">Newest First</option>
              <option value="created_at">Oldest First</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
              <option value="-name">Name: Z to A</option>
            </select>
          </div>

          <div class="flex items-end">
            <button
              type="button"
              (click)="applyFilters()"
              class="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>

      <!-- Products List -->
      <app-products-list
        [products]="products"
        [loading]="loading"
        [error]="error"
        [totalCount]="totalCount"
      />
    </section>
  `,
  styles: [],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  products: Product[] = [];
  loading = false;
  error: string | null = null;
  totalCount = 0;

  filters: ProductFilters = {
    page: 1,
    pageSize: 10,
    minRating: 0,
    ordering: '-created_at',
  };

  ngOnInit(): void {
    // Subscribe to products state
    selectProducts(this.store.getState$())
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.products = products;
      });

    selectProductsCount(this.store.getState$())
      .pipe(takeUntil(this.destroy$))
      .subscribe((count) => {
        this.totalCount = count;
      });

    selectProductsLoading(this.store.getState$())
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.loading = loading;
      });

    selectProductsError(this.store.getState$())
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => {
        this.error = error;
      });

    selectProductFilters(this.store.getState$())
      .pipe(takeUntil(this.destroy$))
      .subscribe((filters) => {
        if (filters) {
          this.filters = { ...filters };
        }
      });

    // Load initial products
    this.applyFilters();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFilters(): void {
    this.store.dispatch(updateFilters(this.filters));
    this.store.dispatch(loadProducts(this.filters));
  }
}
