import { Injectable, inject } from '@angular/core';
import { Store } from '../../core/store/store';
import { ShopApiService } from '../../core/services/shop-api.service';
import { NotificationService } from '../../core/services/notification.service';
import {
  AuthActions,
  loginSuccess,
  loginFailure,
  refreshSuccess,
  refreshFailure,
} from './auth.actions';
import { loadUser } from '../user/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  private store = inject(Store);
  private api = inject(ShopApiService);
  private notification = inject(NotificationService);

  constructor() {
    this.setupEffects();
  }

  private setupEffects(): void {
    // Listen for LOGIN actions
    const originalDispatch = this.store.dispatch.bind(this.store);
    this.store.dispatch = (action: any) => {
      originalDispatch(action);

      if (action.type === AuthActions.LOGIN) {
        this.handleLogin(action.payload);
      } else if (action.type === AuthActions.REFRESH_TOKEN) {
        this.handleRefresh(action.payload);
      } else if (action.type === AuthActions.LOGIN_SUCCESS) {
        this.store.dispatch(loadUser());
      }
    };
  }

  private handleLogin(credentials: { username: string; password: string }): void {
    this.api.login(credentials).subscribe({
      next: (response) => {
        this.store.dispatch(loginSuccess(response));
        this.notification.success('Connexion réussie');
      },
      error: (error) => {
        const message = error?.error?.detail || error?.message || 'Login failed';
        this.store.dispatch(loginFailure(message));
        this.notification.error(`Échec de connexion: ${message}`);
      },
    });
  }

  private handleRefresh(refreshToken: string): void {
    this.api.refreshToken(refreshToken).subscribe({
      next: (response) => {
        this.store.dispatch(refreshSuccess(response.access));
      },
      error: (error) => {
        const message = error?.error?.detail || error?.message || 'Token refresh failed';
        this.store.dispatch(refreshFailure(message));
      },
    });
  }
}
