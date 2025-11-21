import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="w-full max-w-xl">
      <div class="rounded-2xl border border-gray-200 bg-white p-10 shadow-lg">
        <div class="mb-8 text-center">
          <h2 class="text-4xl font-bold text-gray-900 mb-3">Welcome Back</h2>
          <p class="text-gray-600 text-lg">Login to My Shop</p>
        </div>

        <form (submit)="handleSubmit($event)" class="space-y-6">
          <div>
            <label for="username" class="block text-base font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              [(ngModel)]="username"
              name="username"
              required
              class="w-full rounded-xl border-2 border-gray-300 px-5 py-4 text-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              [disabled]="loading"
            />
          </div>

          <div>
            <label for="password" class="block text-base font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              [(ngModel)]="password"
              name="password"
              required
              class="w-full rounded-xl border-2 border-gray-300 px-5 py-4 text-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              [disabled]="loading"
            />
          </div>

          @if (error) {
            <div class="rounded-xl bg-red-50 border-2 border-red-200 p-4 text-base text-red-700">
              {{ error }}
            </div>
          }

          <button
            type="submit"
            [disabled]="loading"
            class="w-full rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
          >
            @if (loading) {
              <span class="flex items-center justify-center gap-3">
                <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Logging in...
              </span>
            } @else {
              Login
            }
          </button>
        </form>

        <div class="mt-6 text-center text-base text-gray-500 border-t border-gray-200 pt-6">
          <p>Default credentials: <strong class="text-gray-700">demo / demo</strong></p>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginFormComponent {
  @Input() loading = false;
  @Input() error: string | null = null;
  @Output() submitForm = new EventEmitter<{ username: string; password: string }>();

  username = 'demo';
  password = 'demo';

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (!this.loading) {
      this.submitForm.emit({
        username: this.username,
        password: this.password,
      });
    }
  }
}
