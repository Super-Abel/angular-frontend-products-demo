import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="w-full max-w-md">
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Login to My Shop</h2>

        <form (submit)="handleSubmit($event)" class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              [(ngModel)]="username"
              name="username"
              required
              class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your username"
              [disabled]="loading"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              [(ngModel)]="password"
              name="password"
              required
              class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your password"
              [disabled]="loading"
            />
          </div>

          @if (error) {
            <div class="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {{ error }}
            </div>
          }

          <button
            type="submit"
            [disabled]="loading"
            class="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            @if (loading) {
              <span class="flex items-center justify-center gap-2">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Logging in...
              </span>
            } @else {
              Login
            }
          </button>
        </form>

        <div class="mt-4 text-center text-sm text-gray-500">
          <p>Default credentials: <strong>demo / demo</strong></p>
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
