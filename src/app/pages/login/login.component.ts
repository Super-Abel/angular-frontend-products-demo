import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { Store } from '../../core/store/store';
import { login } from '../../state/auth/auth.actions';
import {
  selectAuthLoading,
  selectAuthError,
  selectIsAuthenticated,
} from '../../state/auth/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  template: `
    <section class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <app-login-form [loading]="loading" [error]="error" (submitForm)="onLogin($event)" />
    </section>
  `,
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    // Subscribe to loading state
    selectAuthLoading(this.store.getState$())
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.loading = loading;
      });

    // Subscribe to error state
    selectAuthError(this.store.getState$())
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => {
        this.error = error;
      });

    // Subscribe to auth state and redirect if logged in
    selectIsAuthenticated(this.store.getState$())
      .pipe(takeUntil(this.destroy$))
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/shop/products']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onLogin(credentials: { username: string; password: string }): void {
    this.store.dispatch(login(credentials));
  }
}
