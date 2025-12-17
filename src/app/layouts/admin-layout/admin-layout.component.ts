import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="flex h-screen bg-gray-50">
      <aside class="w-64 bg-white border-r-2 border-gray-200">
        <div class="p-6 border-b-2 border-gray-200">
          <h1 class="text-2xl font-black bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>
        <nav class="p-4 space-y-2">
          <a routerLink="/admin/dashboard" routerLinkActive="bg-green-50 text-green-600 font-bold"
             class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all">
            📊 Dashboard
          </a>
          <a routerLink="/" class="block px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all font-medium">
            ← Retour accueil
          </a>
        </nav>
      </aside>
      <main class="flex-1 overflow-auto">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AdminLayoutComponent {}
