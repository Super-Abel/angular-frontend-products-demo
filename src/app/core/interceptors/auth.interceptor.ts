import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '../store/store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const state = store.getState();
  const accessToken = state.auth?.access;

  if (accessToken && !req.url.includes('/auth/token')) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
