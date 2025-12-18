import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  createdAt: string;
}

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-4">
      <div *ngFor="let review of reviews; trackBy: trackById" class="border-b pb-4">
        <div class="flex justify-between items-start mb-2">
          <div>
            <p class="font-semibold">{{ review.user }}</p>
            <div class="flex items-center gap-2">
              <div class="text-yellow-500">{{ getStars(review.rating) }}</div>
              <span class="text-sm text-gray-600">{{ review.createdAt | date: 'short' }}</span>
            </div>
          </div>
        </div>
        <p class="text-gray-700">{{ review.comment }}</p>
      </div>

      <div *ngIf="reviews.length === 0" class="text-center py-8 text-gray-500">
        Aucun avis pour le moment
      </div>
    </div>
  `,
})
export class ReviewListComponent {
  @Input() reviews: Review[] = [];

  trackById(index: number, review: Review): string {
    return review.id;
  }

  getStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
}
