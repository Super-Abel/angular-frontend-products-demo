import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '../../core/store/store';
import { addToCart } from '../../state/cart/cart.actions';
import { WishlistButtonComponent } from '../wishlist-button/wishlist-button.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, WishlistButtonComponent],
  template: `
    <div
      class="rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      @if (image) {
        <div class="aspect-square w-full bg-gray-100 relative">
          <img
            [src]="image"
            [alt]="name"
            class="w-full h-full object-cover"
            (error)="onImageError($event)"
          />
          <div class="absolute top-2 right-2">
            <app-wishlist-button [productId]="id" />
          </div>
        </div>
      }

      <div class="p-4">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-semibold text-gray-900">{{ name }}</h3>
          @if (avgRating !== undefined && avgRating > 0) {
            <div class="flex items-center gap-1 text-sm">
              <span class="text-yellow-500">★</span>
              <span class="text-gray-600">{{ avgRating.toFixed(1) }}</span>
            </div>
          }
        </div>

        <div class="flex justify-between items-end">
          <div>
            <p class="text-2xl font-bold text-blue-600">{{ price | currency: 'EUR' }}</p>
            @if (created_at) {
              <p class="text-xs text-gray-500 mt-1">Added {{ formatDate(created_at) }}</p>
            }
          </div>

          <button
            type="button"
            (click)="addToCart()"
            [attr.aria-label]="'Ajouter ' + name + ' au panier'"
            class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ProductCardComponent {
  private store = inject(Store);

  @Input() id = 0;
  @Input() name = '';
  @Input() price = 0;
  @Input() created_at = '';
  @Input() avgRating?: number;
  @Input() image?: string;

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/images/placeholder.jpg';
  }

  addToCart(): void {
    this.store.dispatch(
      addToCart(
        {
          id: this.id,
          name: this.name,
          price: this.price,
          image: this.image,
        },
        1,
      ),
    );
  }
}
