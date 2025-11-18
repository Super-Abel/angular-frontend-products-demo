import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
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
            <p class="text-xs text-gray-500 mt-1">
              Added {{ formatDate(created_at) }}
            </p>
          }
        </div>

        <button
          type="button"
          class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class ProductCardComponent {
  @Input() name = '';
  @Input() price = 0;
  @Input() created_at = '';
  @Input() avgRating?: number;

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
}
