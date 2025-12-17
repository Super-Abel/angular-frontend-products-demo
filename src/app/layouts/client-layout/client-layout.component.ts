import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CartSelectors } from '../../state/cart/cart.selectors';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <app-navbar [cartItemCount$]="cartItemCount$"></app-navbar>
    <main class="ml-64 pt-4">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class ClientLayoutComponent {
  private cartSelectors = new CartSelectors();
  cartItemCount$ = this.cartSelectors.selectCartItemCount();
}
