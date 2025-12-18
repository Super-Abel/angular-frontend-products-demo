import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '../../../core/store/store';
import { selectUser } from '../../../state/user/user.selectors';
import { loadUser, updateUser } from '../../../state/user/user.actions';
import { Observable } from 'rxjs';
import { User } from '../../../state/user/user.actions';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gray-50 p-8">
      <div class="max-w-4xl mx-auto">
        <div class="mb-12">
          <h1 class="text-5xl font-black mb-2 tracking-tight">Mon Profil</h1>
          <div class="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
        </div>

        <div *ngIf="user$ | async as user" class="space-y-6">
          <!-- User Card -->
          <div
            class="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg relative overflow-hidden"
          >
            <div
              class="absolute top-0 right-0 w-64 h-64 bg-cyan-400 opacity-5 rounded-full -mr-32 -mt-32"
            ></div>

            <div class="flex items-start gap-6 relative z-10">
              <div
                class="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-4xl font-black text-white"
              >
                {{ user.fullName?.charAt(0) || 'U' }}
              </div>

              <div class="flex-1">
                <h2 class="text-2xl font-bold mb-1 text-gray-900">
                  {{ user.fullName || 'Utilisateur' }}
                </h2>
                <p class="text-gray-600 text-sm mb-4">{{ user.email }}</p>
                <div class="flex gap-4">
                  <div class="px-4 py-2 bg-cyan-50 border border-cyan-200 rounded-lg">
                    <span class="text-xs text-cyan-700 font-medium">Commandes</span>
                    <p class="text-xl font-bold text-cyan-600">{{ user.orders.length || 0 }}</p>
                  </div>
                  <div class="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <span class="text-xs text-blue-700 font-medium">Wishlist</span>
                    <p class="text-xl font-bold text-blue-600">
                      {{ user.wishlistProductIds.length || 0 }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Infos personnelles -->
          <div class="bg-white border-2 border-gray-200 rounded-xl p-6 shadow">
            <h2 class="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
              <span class="w-2 h-2 bg-cyan-400 rounded-full"></span>
              Informations personnelles
            </h2>
            <div class="grid gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                <input
                  type="text"
                  [(ngModel)]="user.fullName"
                  class="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all"
                  placeholder="Votre nom complet"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  [value]="user.email"
                  disabled
                  class="w-full bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <!-- Préférences -->
          <div class="bg-white border-2 border-gray-200 rounded-xl p-6 shadow">
            <h2 class="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
              <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
              Préférences
            </h2>
            <div class="space-y-6">
              <label
                class="flex items-center gap-3 p-4 bg-gray-50 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-cyan-300 hover:bg-cyan-50 transition-all"
              >
                <input
                  type="checkbox"
                  [(ngModel)]="user.preferences.newsletter"
                  class="w-5 h-5 accent-cyan-500"
                />
                <div>
                  <span class="font-medium text-gray-900">Newsletter</span>
                  <p class="text-sm text-gray-600">Recevoir les dernières offres et nouveautés</p>
                </div>
              </label>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Note minimum par défaut</label
                >
                <select
                  [(ngModel)]="user.preferences.defaultMinRating"
                  class="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                >
                  <option [value]="0">Tous les produits</option>
                  <option [value]="3">⭐⭐⭐ 3 étoiles et plus</option>
                  <option [value]="4">⭐⭐⭐⭐ 4 étoiles et plus</option>
                  <option [value]="5">⭐⭐⭐⭐⭐ 5 étoiles uniquement</option>
                </select>
              </div>
            </div>
          </div>

          <button
            (click)="save(user)"
            class="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold px-8 py-4 rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg hover:shadow-cyan-500/50"
          >
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ProfileComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(private store: Store<any>) {
    this.user$ = selectUser(this.store.getState$());
  }

  ngOnInit() {
    this.store.dispatch(loadUser());
  }

  save(user: User) {
    this.store.dispatch(updateUser(user));
  }
}
