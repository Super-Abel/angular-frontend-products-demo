import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-gray-50 p-6 rounded-lg">
      <h3 class="font-semibold text-lg mb-4">Laisser un avis</h3>
      <form (ngSubmit)="submit()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Note</label>
          <div class="flex gap-2">
            <button
              *ngFor="let star of [1, 2, 3, 4, 5]"
              type="button"
              (click)="rating = star"
              [class.text-yellow-500]="star <= rating"
              [class.text-gray-300]="star > rating"
              class="text-3xl hover:scale-110 transition"
              attr.aria-label="Note {{ star }} étoiles"
            >
              {{ star <= rating ? '★' : '☆' }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Commentaire</label>
          <textarea
            [(ngModel)]="comment"
            name="comment"
            rows="4"
            class="w-full border rounded px-3 py-2"
            placeholder="Partagez votre expérience..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          [disabled]="!rating || !comment.trim()"
          class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Publier l'avis
        </button>
      </form>
    </div>
  `,
})
export class ReviewFormComponent {
  @Output() reviewSubmit = new EventEmitter<{ rating: number; comment: string }>();

  rating = 0;
  comment = '';

  submit() {
    if (this.rating && this.comment.trim()) {
      this.reviewSubmit.emit({ rating: this.rating, comment: this.comment });
      this.rating = 0;
      this.comment = '';
    }
  }
}
