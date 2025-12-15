import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartSelectors } from './state/cart/cart.selectors';
import { NotificationToastComponent } from './components/notification-toast/notification-toast.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NotificationToastComponent, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private cartSelectors = new CartSelectors();
  protected readonly title = signal('my-shop');

  cartItemCount$ = this.cartSelectors.selectCartItemCount();
}
