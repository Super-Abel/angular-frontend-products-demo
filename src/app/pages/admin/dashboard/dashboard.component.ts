import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopApiService } from '../../../core/services/shop-api.service';
import { Observable, of } from 'rxjs';

interface AdminStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  topProducts: { productId: string; name: string; sold: number; revenue: number }[];
  recentOrders: { id: string; user: string; total: number; createdAt: string; status: string }[];
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gray-50 p-8">
      <div class="max-w-7xl mx-auto">
        <div class="mb-12">
          <h1 class="text-5xl font-black mb-2 tracking-tight text-gray-900">Dashboard Admin</h1>
          <div class="h-1 w-20 bg-gradient-to-r from-green-400 to-emerald-500"></div>
        </div>

        <div *ngIf="stats$ | async as stats">
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg relative overflow-hidden hover:border-green-300 transition-all">
              <div class="absolute top-0 right-0 w-32 h-32 bg-green-400 opacity-5 rounded-full -mr-16 -mt-16"></div>
              <div class="relative z-10">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-gray-600 text-sm font-bold uppercase tracking-wider">Utilisateurs</h3>
                  <span class="text-3xl">👥</span>
                </div>
                <p class="text-5xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  {{ stats.totalUsers }}
                </p>
              </div>
            </div>

            <div class="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg relative overflow-hidden hover:border-blue-300 transition-all">
              <div class="absolute top-0 right-0 w-32 h-32 bg-blue-400 opacity-5 rounded-full -mr-16 -mt-16"></div>
              <div class="relative z-10">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-gray-600 text-sm font-bold uppercase tracking-wider">Commandes</h3>
                  <span class="text-3xl">📦</span>
                </div>
                <p class="text-5xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  {{ stats.totalOrders }}
                </p>
              </div>
            </div>

            <div class="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg relative overflow-hidden hover:border-yellow-300 transition-all">
              <div class="absolute top-0 right-0 w-32 h-32 bg-yellow-400 opacity-5 rounded-full -mr-16 -mt-16"></div>
              <div class="relative z-10">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-gray-600 text-sm font-bold uppercase tracking-wider">Chiffre d'affaires</h3>
                  <span class="text-3xl">💰</span>
                </div>
                <p class="text-4xl font-black bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  {{ stats.totalRevenue | currency: 'EUR' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Tables -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white border-2 border-gray-200 rounded-xl p-6 shadow">
              <h2 class="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900">
                <span class="w-3 h-3 bg-green-400 rounded-full"></span>
                Top Produits
              </h2>
              <div class="space-y-4">
                <div
                  *ngFor="let product of stats.topProducts; let i = index; trackBy: trackByProductId"
                  class="flex items-center gap-4 p-4 bg-gray-50 border-2 border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all"
                >
                  <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center font-black text-white text-lg shadow-md">
                    {{ i + 1 }}
                  </div>
                  <div class="flex-1">
                    <p class="font-bold text-gray-900">{{ product.name }}</p>
                    <p class="text-sm text-gray-600">{{ product.sold }} vendus</p>
                  </div>
                  <p class="text-xl font-bold text-green-600">{{ product.revenue | currency: 'EUR' }}</p>
                </div>
              </div>
            </div>

            <div class="bg-white border-2 border-gray-200 rounded-xl p-6 shadow">
              <h2 class="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900">
                <span class="w-3 h-3 bg-blue-400 rounded-full"></span>
                Commandes récentes
              </h2>
              <div class="space-y-4">
                <div
                  *ngFor="let order of stats.recentOrders; trackBy: trackByOrderId"
                  class="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <p class="font-bold text-gray-900">{{ order.user }}</p>
                      <p class="text-xs text-gray-600">{{ order.createdAt | date: 'dd/MM/yyyy HH:mm' }}</p>
                    </div>
                    <p class="text-lg font-bold text-blue-600">{{ order.total | currency: 'EUR' }}</p>
                  </div>
                  <span [class]="getStatusClass(order.status)" class="inline-block px-3 py-1 rounded-full text-xs font-bold">
                    {{ order.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AdminDashboardComponent implements OnInit {
  stats$: Observable<AdminStats | null> = of(null);

  constructor(private api: ShopApiService) {}

  ngOnInit() {
    this.stats$ = this.api.get('/api/admin/stats/');
  }

  trackByProductId(index: number, item: any): string {
    return item.productId;
  }

  trackByOrderId(index: number, item: any): string {
    return item.id;
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      processing: 'bg-yellow-500 text-black',
      shipped: 'bg-blue-500 text-white',
      delivered: 'bg-green-500 text-white',
    };
    return classes[status] || 'bg-gray-500 text-white';
  }
}
