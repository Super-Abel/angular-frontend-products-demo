import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  APP_INITIALIZER,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { Store } from './core/store/store';
import { authReducer, initialAuthState } from './state/auth/auth.reducer';
import { productsReducer, initialProductsState } from './state/products/products.reducer';
import { cartReducer } from './state/cart/cart.reducer';
import { userReducer } from './state/user/user.reducer';
import { AuthEffects } from './state/auth/auth.effects';
import { ProductsEffects } from './state/products/products.effects';
import { CartEffects } from './state/cart/cart.effects';
import { UserEffects } from './state/user/user.effects';
import { authInterceptor } from './core/interceptors/auth.interceptor';

function initializeStore(store: Store<any>) {
  return () => {
    // Register reducers
    store.registerReducer('auth', authReducer);
    store.registerReducer('products', productsReducer);
    store.registerReducer('cart', cartReducer);
    store.registerReducer('user', userReducer);

    // Initialize state
    store.dispatch({ type: '@@INIT' });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    Store,
    AuthEffects,
    ProductsEffects,
    CartEffects,
    UserEffects,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeStore,
      deps: [Store, AuthEffects, ProductsEffects, CartEffects, UserEffects],
      multi: true,
    },
  ],
};
