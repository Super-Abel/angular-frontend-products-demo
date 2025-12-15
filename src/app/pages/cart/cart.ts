import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Store } from '../../core/store/store';
import { CartSelectors } from '../../state/cart/cart.selectors';
import { removeFromCart, updateQuantity, clearCart } from '../../state/cart/cart.actions';
import { CartItem } from '../../state/cart/cart.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private cartSelectors = new CartSelectors();

  cartItems$!: Observable<CartItem[]>;
  cartTotal$!: Observable<number>;
  cartItemCount$!: Observable<number>;

  ngOnInit(): void {
    this.cartItems$ = this.cartSelectors.selectCartItems();
    this.cartTotal$ = this.cartSelectors.selectCartTotal();
    this.cartItemCount$ = this.cartSelectors.selectCartItemCount();
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity >= 0) {
      this.store.dispatch(updateQuantity(productId, quantity));
    }
  }

  removeItem(productId: number): void {
    this.store.dispatch(removeFromCart(productId));
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.store.dispatch(clearCart());
    }
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  trackByItemId(index: number, item: CartItem): number {
    return item.id;
  }
}
