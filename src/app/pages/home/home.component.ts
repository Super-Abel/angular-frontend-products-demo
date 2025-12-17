import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <!-- Hero Section -->
      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="text-center mb-16">
          <h1 class="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            MyShop
          </h1>
          <p class="text-2xl text-gray-600 mb-8">
            Plateforme E-Commerce Professionnelle
          </p>
          <p class="text-lg text-gray-500 max-w-2xl mx-auto">
            Solution complète de commerce en ligne avec gestion des produits, commandes, et interface administrateur
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <div class="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-cyan-300 transition-all">
            <div class="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-4">
              <span class="text-3xl text-white">🛍️</span>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">Catalogue Produits</h3>
            <p class="text-gray-600 mb-4">
              Navigation avancée avec filtres, pagination, et recherche
            </p>
            <ul class="text-sm text-gray-500 space-y-2">
              <li>✓ Filtres temps réel</li>
              <li>✓ Wishlist personnalisée</li>
              <li>✓ Avis clients</li>
            </ul>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-blue-300 transition-all">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mb-4">
              <span class="text-3xl text-white">👤</span>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">Espace Client</h3>
            <p class="text-gray-600 mb-4">
              Gestion complète du compte et des commandes
            </p>
            <ul class="text-sm text-gray-500 space-y-2">
              <li>✓ Profil personnalisé</li>
              <li>✓ Historique commandes</li>
              <li>✓ Suivi livraison</li>
            </ul>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-green-300 transition-all">
            <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <span class="text-3xl text-white">⚙️</span>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">Dashboard Admin</h3>
            <p class="text-gray-600 mb-4">
              Interface de gestion pour administrateurs
            </p>
            <ul class="text-sm text-gray-500 space-y-2">
              <li>✓ Statistiques temps réel</li>
              <li>✓ Gestion produits</li>
              <li>✓ Suivi commandes</li>
            </ul>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            routerLink="/login"
            class="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-bold rounded-xl hover:shadow-xl transition-all hover:scale-105"
          >
            Connexion Client
          </a>
          <a
            routerLink="/admin/dashboard"
            class="px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-bold rounded-xl hover:shadow-xl transition-all hover:scale-105"
          >
            Accès Admin
          </a>
          <a
            routerLink="/dev"
            class="px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-lg font-bold rounded-xl hover:shadow-xl transition-all hover:scale-105"
          >
            MSW API Tests
          </a>
        </div>

        <!-- Tech Stack -->
        <div class="mt-20 pt-16 border-t-2 border-gray-200">
          <h3 class="text-center text-2xl font-bold text-gray-900 mb-8">Technologies</h3>
          <div class="flex flex-wrap justify-center gap-6 text-gray-600">
            <div class="px-6 py-3 bg-white rounded-lg border-2 border-gray-200 font-semibold">Angular 18</div>
            <div class="px-6 py-3 bg-white rounded-lg border-2 border-gray-200 font-semibold">NgRx Store</div>
            <div class="px-6 py-3 bg-white rounded-lg border-2 border-gray-200 font-semibold">MSW API Mock</div>
            <div class="px-6 py-3 bg-white rounded-lg border-2 border-gray-200 font-semibold">Tailwind CSS</div>
          </div>
        </div>

        <!-- Credentials -->
        <div class="mt-12 text-center p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <p class="text-sm text-gray-700 mb-2">
            <strong>Identifiants de test :</strong>
          </p>
          <p class="text-sm text-gray-600">
            Client : <code class="bg-white px-3 py-1 rounded">demo / demo</code>
          </p>
        </div>
      </section>
    </div>
  `,
})
export class HomeComponent {}
