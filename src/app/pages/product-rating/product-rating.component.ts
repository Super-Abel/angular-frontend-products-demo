import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '../../core/store/store';
import { ProductRating } from '../../core/models/product.models';
import { loadRating } from '../../state/products/products.actions';
import { selectSelectedRating, selectRatingLoading } from '../../state/products/products.selectors';

@Component({
  selector: 'app-product-rating',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="mx-auto max-w-3xl px-4 py-8">
      <div class="mb-6 flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">Product Rating</h1>
        <button
          type="button"
          routerLink="/app"
          class="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          ← Back
        </button>
      </div>

      <!-- Input Form -->
      <div class="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <form (submit)="$event.preventDefault(); loadRatingData()" class="flex gap-4">
          <div class="flex-1">
            <label for="productId" class="block text-sm font-medium text-gray-700 mb-1">
              Product ID
            </label>
            <input
              id="productId"
              type="number"
              [(ngModel)]="productId"
              name="productId"
              min="1"
              class="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Enter product ID"
            />
          </div>
          <div class="flex items-end">
            <button
              type="button"
              (click)="loadRatingData()"
              [disabled]="loading"
              class="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              @if (loading) {
                <span class="flex items-center gap-2">
                  <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Loading...
                </span>
              } @else {
                Fetch Rating
              }
            </button>
          </div>
        </form>
      </div>

      <!-- Rating Display -->
      @if (rating) {
        <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            Rating for Product #{{ rating.product_id }}
          </h2>

          <div class="grid grid-cols-2 gap-6">
            <div class="text-center">
              <div class="text-4xl font-bold text-yellow-500 mb-2">
                ★ {{ rating.avg_rating.toFixed(2) }}
              </div>
              <p class="text-sm text-gray-600">Average Rating</p>
            </div>

            <div class="text-center">
              <div class="text-4xl font-bold text-blue-600 mb-2">
                {{ rating.count }}
              </div>
              <p class="text-sm text-gray-600">Total Reviews</p>
            </div>
          </div>

          <!-- Rating Bar -->
          <div class="mt-6">
            <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full bg-yellow-500 rounded-full transition-all"
                [style.width.%]="(rating.avg_rating / 5) * 100"
              ></div>
            </div>
            <p class="text-xs text-gray-500 mt-1 text-center">
              {{ ((rating.avg_rating / 5) * 100).toFixed(0) }}% of maximum rating
            </p>
          </div>
        </div>
      } @else if (!loading) {
        <div class="text-center py-12 text-gray-500">
          <p class="text-lg font-medium">Enter a product ID to view its rating</p>
        </div>
      }
    </section>
  `,
  styles: [],
})
export class ProductRatingComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  productId = 1;
  rating: ProductRating | null = null;
  loading = false;

  ngOnInit(): void {
    selectSelectedRating(this.store.getState$())
      .pipe(takeUntil(this.destroy$))
      .subscribe((rating) => {
        this.rating = rating;
      });

    selectRatingLoading(this.store.getState$())
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadRatingData(): void {
    if (this.productId > 0) {
      this.store.dispatch(loadRating(this.productId));
    }
  }
}
