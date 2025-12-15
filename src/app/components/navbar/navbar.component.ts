import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-white border-b-2 border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <a routerLink="/shop/products" class="text-2xl font-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            MyShop
          </a>

          <a routerLink="/shop/cart" routerLinkActive="text-blue-600 font-bold" class="text-gray-700 hover:text-blue-600 transition-colors relative">
            Panier
            <span *ngIf="(cartItemCount$ | async) as count" class="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {{ count }}
            </span>
          </a>
        </div>
      </div>
    </nav>

    <aside class="fixed left-0 top-16 h-full w-64 bg-white border-r-2 border-gray-200 pt-6 z-40">
      <nav class="flex flex-col gap-2 px-4">
        <a routerLink="/shop/products" routerLinkActive="bg-cyan-50 text-cyan-600 font-bold" [routerLinkActiveOptions]="{exact: false}"
           class="px-4 py-3 rounded-lg text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-all">
          Produits
        </a>
        <a routerLink="/account/wishlist" routerLinkActive="bg-pink-50 text-pink-600 font-bold"
           class="px-4 py-3 rounded-lg text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all">
          Wishlist
        </a>
        <a routerLink="/account/orders" routerLinkActive="bg-purple-50 text-purple-600 font-bold"
           class="px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all">
          Commandes
        </a>
        <a routerLink="/account/profile" routerLinkActive="bg-cyan-50 text-cyan-600 font-bold"
           class="px-4 py-3 rounded-lg text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-all">
          Profil
        </a>
        <a routerLink="/admin/dashboard" routerLinkActive="bg-green-50 text-green-600 font-bold"
           class="px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all">
          Admin
        </a>
      </nav>
    </aside>
  `,
})
export class NavbarComponent {
  @Input() cartItemCount$!: Observable<number>;
}
