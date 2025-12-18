import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';
import { Product } from '../../core/models/product.models';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, SkeletonLoaderComponent],
  template: `
    <div class="space-y-4">
      @if (loading) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (i of [1, 2, 3, 4, 5, 6]; track i) {
            <app-skeleton-loader customClass="h-80 bg-gray-200 rounded-lg"></app-skeleton-loader>
          }
        </div>
      } @else if (error) {
        <div class="rounded-lg bg-red-50 border border-red-200 p-6 text-center">
          <p class="font-semibold text-red-800 text-lg mb-2">Erreur de chargement</p>
          <p class="text-sm text-red-600 mb-4">{{ error }}</p>
          <button
            (click)="onRetry()"
            class="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      } @else if (products.length === 0) {
        <div class="text-center py-12 text-gray-500">
          <p class="text-lg font-medium">No products found</p>
          <p class="text-sm mt-1">Try adjusting your filters</p>
        </div>
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (product of products; track product.id) {
            <app-product-card
              [id]="product.id"
              [name]="product.name"
              [price]="product.price"
              [created_at]="product.created_at"
              [avgRating]="calculateAvgRating(product.ratings)"
              [image]="product.image"
            />
          }
        </div>

        @if (totalCount > 0) {
          <div class="text-center text-sm text-gray-600 mt-4">
            Showing {{ products.length }} of {{ totalCount }} products
          </div>
        }
      }
    </div>
  `,
  styles: [],
})
export class ProductsListComponent {
  @Input() products: Product[] = [];
  @Input() loading = false;
  @Input() error: string | null = null;
  @Input() totalCount = 0;
  @Output() retry = new EventEmitter<void>();

  calculateAvgRating(ratings?: any[]): number {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + (r.value || 0), 0);
    return sum / ratings.length;
  }

  onRetry(): void {
    this.retry.emit();
  }
}
