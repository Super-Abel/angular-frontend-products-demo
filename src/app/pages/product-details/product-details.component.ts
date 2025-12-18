import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '../../core/store/store';
import { ShopApiService } from '../../core/services/shop-api.service';
import { addToCart } from '../../state/cart/cart.actions';
import { toggleWishlist } from '../../state/user/user.actions';
import { isInWishlist } from '../../state/user/user.selectors';
import { ReviewListComponent } from '../../components/review-list/review-list.component';
import { ReviewFormComponent } from '../../components/review-form/review-form.component';
import { WishlistButtonComponent } from '../../components/wishlist-button/wishlist-button.component';
import { NotificationService } from '../../core/services/notification.service';

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  stock: number;
  lowStockThreshold: number;
}

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  createdAt: string;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ReviewListComponent, ReviewFormComponent, WishlistButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      @if (loading) {
        <div class="animate-pulse">
          <div class="h-96 bg-gray-200 rounded-lg mb-4"></div>
          <div class="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div class="h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
      } @else if (product) {
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <!-- Image -->
          <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            @if (product.image) {
              <img [src]="product.image" [alt]="product.name" class="w-full h-full object-cover" />
            }
          </div>

          <!-- Info -->
          <div>
            <div class="flex items-start justify-between mb-4">
              <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>
              <app-wishlist-button
                [productId]="product.id"
              />
            </div>

            <p class="text-4xl font-bold text-blue-600 mb-4">{{ product.price | currency: 'EUR' }}</p>

            @if (product.description) {
              <p class="text-gray-700 mb-6">{{ product.description }}</p>
            }

            <!-- Stock status -->
            <div class="mb-6">
              @if (product.stock === 0) {
                <span class="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  Rupture de stock
                </span>
              } @else if (product.stock <= product.lowStockThreshold) {
                <span class="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Plus que {{ product.stock }} en stock
                </span>
              } @else {
                <span class="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  En stock
                </span>
              }
            </div>

            <button
              type="button"
              (click)="onAddToCart()"
              [disabled]="product.stock === 0"
              [attr.aria-label]="'Ajouter ' + product.name + ' au panier'"
              class="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Ajouter au panier
            </button>
          </div>
        </div>

        <!-- Reviews Section -->
        <div class="border-t pt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Avis clients</h2>

          <app-review-list
            [reviews]="reviews"
          />

          <div class="mt-8">
            <h3 class="text-xl font-semibold mb-4">Laisser un avis</h3>
            <app-review-form
              (reviewSubmit)="onSubmitReview($event)"
            />
          </div>
        </div>
      } @else {
        <div class="text-center py-12">
          <p class="text-gray-500">Produit non trouvé</p>
        </div>
      }
    </div>
  `,
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private api = inject(ShopApiService);
  private notification = inject(NotificationService);

  product: Product | null = null;
  reviews: Review[] = [];
  loading = true;
  reviewsLoading = true;
  isInWishlist$ = this.store.select('user').pipe(isInWishlist(0));

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(Number(id));
      this.loadReviews(Number(id));
      this.isInWishlist$ = this.store.select('user').pipe(isInWishlist(Number(id)));
    }
  }

  loadProduct(id: number) {
    this.api.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  loadReviews(id: number) {
    this.api.getProductReviews(id).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.reviewsLoading = false;
      },
      error: () => {
        this.reviewsLoading = false;
      },
    });
  }

  onAddToCart() {
    if (this.product) {
      if (this.product.stock === 0) {
        this.notification.error('Stock insuffisant pour ce produit');
        return;
      }
      this.store.dispatch(
        addToCart(
          {
            id: this.product.id,
            name: this.product.name,
            price: this.product.price,
            image: this.product.image,
          },
          1
        )
      );
      this.notification.success('Produit ajouté au panier');
    }
  }

  onToggleWishlist() {
    if (this.product) {
      this.store.dispatch(toggleWishlist(this.product.id));
    }
  }

  onSubmitReview(review: { rating: number; comment: string }) {
    if (this.product) {
      this.api.postProductReview(this.product.id, review).subscribe({
        next: () => {
          this.loadReviews(this.product!.id);
          this.notification.success('Avis publié avec succès');
        },
        error: () => {
          this.notification.error('Échec de publication de l\'avis');
        },
      });
    }
  }
}
