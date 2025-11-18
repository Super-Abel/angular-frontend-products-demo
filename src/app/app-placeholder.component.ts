import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Store } from './core/store/store';
import { selectIsAuthenticated, selectAuthState } from './state/auth/auth.selectors';
import { logout } from './state/auth/auth.actions';

@Component({
  standalone: true,
  selector: 'app-placeholder',
  imports: [CommonModule, RouterLink],
  template: `
    <section class="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold text-gray-900">My Shop Application</h2>
          <p class="text-gray-600 mt-2">Welcome to the shop management system</p>
        </div>

        @if (isAuthenticated) {
          <div class="flex items-center gap-3">
            <div class="rounded-lg bg-green-100 border border-green-200 px-4 py-2">
              <span class="text-green-700 font-medium">✓ Logged In</span>
            </div>
            <button
              type="button"
              (click)="handleLogout()"
              class="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 font-medium"
            >
              Logout
            </button>
          </div>
        } @else {
          <div class="rounded-lg bg-yellow-100 border border-yellow-200 px-4 py-2">
            <span class="text-yellow-700 font-medium">Not Logged In</span>
          </div>
        }
      </div>

      <!-- Main Navigation -->
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 class="text-xl font-semibold mb-4">Main Features</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            routerLink="/login"
            class="rounded-lg border-2 border-blue-600 bg-blue-50 p-4 hover:bg-blue-100 transition-colors text-left"
          >
            <div class="text-2xl mb-2">🔐</div>
            <h4 class="font-semibold text-blue-900">Login</h4>
            <p class="text-sm text-blue-700 mt-1">Authenticate with your credentials</p>
          </button>

          <button
            type="button"
            routerLink="/shop/products"
            class="rounded-lg border-2 border-green-600 bg-green-50 p-4 hover:bg-green-100 transition-colors text-left"
          >
            <div class="text-2xl mb-2">🛍️</div>
            <h4 class="font-semibold text-green-900">Products</h4>
            <p class="text-sm text-green-700 mt-1">Browse and filter products</p>
          </button>

          <button
            type="button"
            routerLink="/shop/rating"
            class="rounded-lg border-2 border-purple-600 bg-purple-50 p-4 hover:bg-purple-100 transition-colors text-left"
          >
            <div class="text-2xl mb-2">⭐</div>
            <h4 class="font-semibold text-purple-900">Product Rating</h4>
            <p class="text-sm text-purple-700 mt-1">View product ratings and reviews</p>
          </button>
        </div>
      </div>

      <!-- Additional Navigation -->
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 class="text-lg font-semibold mb-3">Other Links</h3>
        <nav class="flex flex-wrap gap-3">
          <button
            type="button"
            routerLink="/dev"
            class="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
          >
            → Developer Testing Area
          </button>
          <button
            type="button"
            routerLink="/"
            class="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
          >
            ← Back to Home
          </button>
        </nav>
      </div>

      <!-- State Info -->
      <div class="text-xs text-gray-500 text-center">
        <p>Built with Custom Redux-style State Management • Angular 20 • Tailwind CSS</p>
      </div>
    </section>
  `,
})
export class AppPlaceholderComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private destroy$ = new Subject<void>();

  isAuthenticated = false;

  ngOnInit(): void {
    selectIsAuthenticated(this.store.getState$())
      .pipe(takeUntil(this.destroy$))
      .subscribe((isAuth) => {
        this.isAuthenticated = isAuth;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleLogout(): void {
    this.store.dispatch(logout());
  }
}
