import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '../../../core/store/store';
import { selectUserOrders } from '../../../state/user/user.selectors';
import { loadOrders } from '../../../state/user/user.actions';
import { Observable } from 'rxjs';
import { OrderSummary } from '../../../state/user/user.actions';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gray-50 p-8">
      <div class="max-w-5xl mx-auto">
        <div class="mb-12">
          <h1 class="text-5xl font-black mb-2 tracking-tight text-gray-900">Mes Commandes</h1>
          <div class="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-500"></div>
        </div>

        <div class="space-y-4">
          <div
            *ngFor="let order of orders$ | async; trackBy: trackByOrderId"
            class="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 hover:shadow-lg transition-all group"
          >
            <div class="flex justify-between items-start">
              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                >
                  #{{ order.id.slice(-2) }}
                </div>
                <div>
                  <h3 class="font-bold text-lg text-gray-900">Commande {{ order.id }}</h3>
                  <p class="text-gray-600 text-sm">
                    {{ order.createdAt | date: 'dd MMM yyyy à HH:mm' }}
                  </p>
                </div>
              </div>
              <div class="text-right">
                <p
                  class="text-3xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
                >
                  {{ order.total | currency: 'EUR' }}
                </p>
                <span
                  [class]="getStatusClass(order.status)"
                  class="inline-block px-4 py-1 rounded-full text-xs font-bold mt-2"
                >
                  {{ getStatusLabel(order.status) }}
                </span>
              </div>
            </div>
            <a
              [routerLink]="['/account/orders', order.id]"
              class="mt-4 inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-all group-hover:gap-3"
            >
              <span>Voir les détails</span>
              <span>→</span>
            </a>
          </div>

          <div
            *ngIf="(orders$ | async)?.length === 0"
            class="text-center py-20 bg-white rounded-xl border-2 border-gray-200"
          >
            <div class="text-6xl mb-4 opacity-30">📦</div>
            <p class="text-gray-600 text-lg font-medium">Aucune commande pour le moment</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class OrdersComponent implements OnInit {
  orders$: Observable<OrderSummary[]>;

  constructor(private store: Store<any>) {
    this.orders$ = selectUserOrders(this.store.getState$());
  }

  ngOnInit() {
    this.store.dispatch(loadOrders());
  }

  trackByOrderId(index: number, order: OrderSummary): string {
    return order.id;
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      processing: 'bg-yellow-500 text-black',
      shipped: 'bg-blue-500 text-white',
      delivered: 'bg-green-500 text-white',
    };
    return classes[status] || 'bg-gray-500 text-white';
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      processing: 'En cours',
      shipped: 'Expédiée',
      delivered: 'Livrée',
    };
    return labels[status] || status;
  }
}
