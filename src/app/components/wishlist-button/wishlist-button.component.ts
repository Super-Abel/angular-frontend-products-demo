import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '../../core/store/store';
import { isInWishlist } from '../../state/user/user.selectors';
import { toggleWishlist } from '../../state/user/user.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wishlist-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      (click)="toggle()"
      [class.text-red-500]="isInWishlist$ | async"
      [class.text-gray-400]="!(isInWishlist$ | async)"
      class="text-2xl hover:scale-110 transition"
      attr.aria-label="{{ (isInWishlist$ | async) ? 'Retirer de' : 'Ajouter à' }} la wishlist"
    >
      {{ (isInWishlist$ | async) ? '❤' : '♡' }}
    </button>
  `,
})
export class WishlistButtonComponent implements OnInit {
  @Input() productId!: number;
  isInWishlist$!: Observable<boolean>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.isInWishlist$ = this.store.select('user').pipe(isInWishlist(this.productId));
  }

  toggle() {
    this.store.dispatch(toggleWishlist(this.productId));
  }
}
