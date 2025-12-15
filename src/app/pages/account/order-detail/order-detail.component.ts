import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShopApiService } from '../../../core/services/shop-api.service';
import { Observable, of } from 'rxjs';

interface OrderDetail {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: { productId: number; name: string; quantity: number; price: number }[];
  subtotal: number;
  discount: number;
  shipping: number;
  taxes: number;
}

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-4xl mx-auto p-6">
      <a routerLink="/account/orders" class="text-blue-600 hover:underline mb-4 inline-block">
        ← Retour aux commandes
      </a>

      <div *ngIf="order$ | async as order" class="mt-6 space-y-6">
        <div class="bg-white p-6 rounded-lg shadow">
          <h1 class="text-3xl font-bold mb-2">Commande #{{ order.id }}</h1>
          <p class="text-gray-600">{{ order.createdAt | date: 'medium' }}</p>
          <span
            [class]="getStatusClass(order.status)"
            class="inline-block px-3 py-1 rounded-full text-sm mt-2"
          >
            {{ order.status }}
          </span>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Articles</h2>
          <div class="space-y-3">
            <div
              *ngFor="let item of order.items; trackBy: trackByProductId"
              class="flex justify-between border-b pb-3"
            >
              <div>
                <p class="font-medium">{{ item.name }}</p>
                <p class="text-gray-600 text-sm">Quantité: {{ item.quantity }}</p>
              </div>
              <p class="font-semibold">{{ item.price * item.quantity | currency: 'EUR' }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Récapitulatif</h2>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>Sous-total</span>
              <span>{{ order.subtotal | currency: 'EUR' }}</span>
            </div>
            <div *ngIf="order.discount > 0" class="flex justify-between text-green-600">
              <span>Remise</span>
              <span>-{{ order.discount | currency: 'EUR' }}</span>
            </div>
            <div class="flex justify-between">
              <span>Frais de port</span>
              <span>{{ order.shipping | currency: 'EUR' }}</span>
            </div>
            <div class="flex justify-between">
              <span>Taxes</span>
              <span>{{ order.taxes | currency: 'EUR' }}</span>
            </div>
            <div class="flex justify-between text-xl font-bold border-t pt-2 mt-2">
              <span>Total</span>
              <span>{{ order.total | currency: 'EUR' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class OrderDetailComponent implements OnInit {
  order$: Observable<OrderDetail | null> = of(null);

  constructor(
    private route: ActivatedRoute,
    private api: ShopApiService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.order$ = this.api.get(`/api/orders/${id}/`);
    }
  }

  trackByProductId(index: number, item: any): number {
    return item.productId;
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      shipped: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800',
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  }
}
