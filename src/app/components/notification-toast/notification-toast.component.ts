import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-notification-toast',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <div
        *ngFor="let notification of notifications$ | async; trackBy: trackById"
        [class]="getNotificationClass(notification.type)"
        class="min-w-[300px] rounded-lg shadow-lg p-4 flex items-start gap-3 animate-slide-in"
      >
        <span class="text-xl">{{ getIcon(notification.type) }}</span>
        <p class="flex-1">{{ notification.message }}</p>
        <button
          (click)="close(notification.id)"
          class="text-current opacity-70 hover:opacity-100"
          aria-label="Fermer la notification"
        >
          ✕
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      @keyframes slide-in {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      .animate-slide-in {
        animation: slide-in 0.3s ease-out;
      }
    `,
  ],
})
export class NotificationToastComponent {
  private notificationService = inject(NotificationService);
  notifications$ = this.notificationService.notifications$;

  trackById(index: number, notification: any): string {
    return notification.id;
  }

  getNotificationClass(type: string): string {
    const classes = {
      success: 'bg-green-100 text-green-800 border-l-4 border-green-600',
      error: 'bg-red-100 text-red-800 border-l-4 border-red-600',
      info: 'bg-blue-100 text-blue-800 border-l-4 border-blue-600',
    };
    return classes[type as keyof typeof classes] || classes.info;
  }

  getIcon(type: string): string {
    const icons = {
      success: '✓',
      error: '✕',
      info: 'ℹ',
    };
    return icons[type as keyof typeof icons] || icons.info;
  }

  close(id: string) {
    this.notificationService.remove(id);
  }
}
