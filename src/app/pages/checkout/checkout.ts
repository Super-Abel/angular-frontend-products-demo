import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '../../core/store/store';
import { CartSelectors } from '../../state/cart/cart.selectors';
import { clearCart } from '../../state/cart/cart.actions';
import { CartItem } from '../../state/cart/cart.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private cartSelectors = new CartSelectors();

  checkoutForm!: FormGroup;
  cartItems$!: Observable<CartItem[]>;
  cartTotal$!: Observable<number>;
  isSubmitting = false;
  orderPlaced = false;

  // Détails de facturation
  subtotal = 0;
  discount = 0;
  shipping = 5.99;
  taxes = 0;

  ngOnInit(): void {
    this.cartItems$ = this.cartSelectors.selectCartItems();
    this.cartTotal$ = this.cartSelectors.selectCartTotal();

    // Calculer les totaux
    this.cartTotal$.subscribe((total) => {
      this.subtotal = total;
      this.taxes = total * 0.2; // 20% TVA
      // Livraison gratuite si > 100€
      this.shipping = total > 100 ? 0 : 5.99;
    });

    this.checkoutForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
      cardName: ['', [Validators.required]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
    });
  }

  submitOrder(): void {
    if (this.checkoutForm.valid) {
      this.isSubmitting = true;

      setTimeout(() => {
        this.orderPlaced = true;
        this.isSubmitting = false;
        this.store.dispatch(clearCart());

        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 3000);
      }, 2000);
    } else {
      Object.keys(this.checkoutForm.controls).forEach((key) => {
        const control = this.checkoutForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  get grandTotal(): number {
    return this.subtotal + this.shipping + this.taxes - this.discount;
  }

  getErrorMessage(fieldName: string): string {
    const control = this.checkoutForm.get(fieldName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email';
    }
    if (control?.hasError('minLength')) {
      return `Minimum length is ${control.getError('minLength').requiredLength}`;
    }
    if (control?.hasError('pattern')) {
      return 'Invalid format';
    }
    return '';
  }
}
