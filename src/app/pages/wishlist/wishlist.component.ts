import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '../../core/store/store';
import { selectWishlist } from '../../state/user/user.selectors';
import { toggleWishlist } from '../../state/user/user.actions';
import { addToCart } from '../../state/cart/cart.actions';
import { Observable, map, switchMap } from 'rxjs';
import { ShopApiService } from '../../core/services/shop-api.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gray-50 p-8">
      <div class="max-w-7xl mx-auto">
        <div class="mb-12">
          <h1 class="text-5xl font-black mb-2 tracking-tight text-gray-900">Ma Wishlist</h1>
          <div class="h-1 w-20 bg-gradient-to-r from-pink-400 to-red-500"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            *ngFor="let product of products$ | async; trackBy: trackById"
            class="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-pink-400 hover:shadow-lg transition-all group"
          >
            <div class="relative">
              <img [src]="product.image" [alt]="product.name" class="w-full h-56 object-cover" />
              <button
                (click)="remove(product.id)"
                class="absolute top-3 right-3 w-10 h-10 bg-white/90 hover:bg-red-500 hover:text-white text-red-500 rounded-full flex items-center justify-center transition-all shadow-lg"
                aria-label="Retirer de la wishlist"
              >
                <span class="text-xl">♥</span>
              </button>
            </div>
            <div class="p-5">
              <h3 class="font-bold text-lg mb-2 text-gray-900">{{ product.name }}</h3>
              <p class="text-3xl font-black bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
                {{ product.price | currency: 'EUR' }}
              </p>
              <button
                (click)="addToCart(product)"
                class="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold px-4 py-3 rounded-lg hover:from-pink-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>

        <div *ngIf="(products$ | async)?.length === 0" class="text-center py-20 bg-white rounded-xl border-2 border-gray-200">
          <div class="text-6xl mb-4 opacity-30">💝</div>
          <p class="text-gray-700 text-lg font-medium">Votre wishlist est vide</p>
          <p class="text-gray-500 text-sm mt-2">Ajoutez vos produits favoris pour les retrouver facilement</p>
        </div>
      </div>
    </div>
  `,
})
export class WishlistComponent implements OnInit {
  products$: Observable<any[]>;

  constructor(
    private store: Store<any>,
    private api: ShopApiService
  ) {
    const wishlistIds$ = selectWishlist(this.store.getState$());
    this.products$ = wishlistIds$.pipe(
      switchMap((ids) => {
        if (ids.length === 0) return new Observable((obs) => obs.next([]));
        return this.api.get('/api/products/').pipe(
          map((res: any) => res.results.filter((p: any) => ids.includes(p.id)))
        );
      })
    );
  }

  ngOnInit() {}

  trackById(index: number, product: any): number {
    return product.id;
  }

  addToCart(product: any) {
    this.store.dispatch(addToCart(product, 1));
  }

  remove(productId: number) {
    this.store.dispatch(toggleWishlist(productId));
  }
}
