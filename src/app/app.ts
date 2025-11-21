import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartSelectors } from './state/cart/cart.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private cartSelectors = new CartSelectors();
  protected readonly title = signal('my-shop');

  cartItemCount$ = this.cartSelectors.selectCartItemCount();
}
