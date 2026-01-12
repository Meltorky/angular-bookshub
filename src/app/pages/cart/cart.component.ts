import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { BookDTO } from '../../models/book.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="cart-page">
      <div class="container">
        <h1>Shopping Cart</h1>
        
        @if (cartItems.length > 0) {
          <div class="cart-container">
            <div class="cart-items">
              @for (item of cartItems; track item.id) {
                <div class="cart-item">
                  <div class="item-image">
                    @if (item.bookCoverURL) {
                      <img [src]="item.bookCoverURL" [alt]="item.name">
                    } @else {
                      <div class="placeholder"></div>
                    }
                  </div>
                  <div class="item-details">
                    <h3>{{ item.name }}</h3>
                    <p class="author">by {{ item.authorName }}</p>
                    <p class="price">\${{ item.price.toFixed(2) }}</p>
                  </div>
                  <button (click)="removeItem(item.id)" class="remove-btn">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                      <path d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H3.862a2 2 0 0 1-1.995-1.858L1 7m5 4v6m4-6v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              }
            </div>
            
            <div class="cart-summary">
              <h2>Order Summary</h2>
              <div class="summary-row">
                <span>Subtotal</span>
                <span>\${{ total.toFixed(2) }}</span>
              </div>
              <div class="summary-row total">
                <span>Total</span>
                <span>\${{ total.toFixed(2) }}</span>
              </div>
              <button (click)="checkout()" [disabled]="processing" class="checkout-btn">
                {{ processing ? 'Processing...' : 'Checkout' }}
              </button>
              @if (!isLoggedIn) {
                <p class="login-hint">Please <a routerLink="/login">login</a> to checkout</p>
              }
            </div>
          </div>
        } @else {
          <div class="empty-cart">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor">
               <path d="M20 28h24m-24 8h16m-24-16h28m-44 4h4l3 28h30l4-28h4" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <p>Your cart is empty</p>
            <a routerLink="/books" class="btn btn-primary">Browse Books</a>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .cart-page { padding: 80px 0; min-height: 100vh; }
    .cart-container { display: grid; grid-template-columns: 2fr 1fr; gap: 40px; }
    .cart-items { display: flex; flex-direction: column; gap: 20px; }
    .cart-item { display: flex; gap: 20px; padding: 20px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); align-items: center; }
    .item-image { width: 80px; height: 120px; flex-shrink: 0; background: #eee; border-radius: 8px; overflow: hidden; }
    .item-image img { width: 100%; height: 100%; object-fit: cover; }
    .item-details { flex: 1; }
    .item-details h3 { font-size: 1.1rem; margin-bottom: 5px; }
    .author { color: #666; font-size: 0.9rem; margin-bottom: 5px; }
    .price { font-weight: bold; color: var(--primary-600); }
    .remove-btn { background: none; border: none; color: #999; cursor: pointer; padding: 5px; }
    .remove-btn:hover { color: var(--error); }
    .cart-summary { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); height: fit-content; }
    .summary-row { display: flex; justify-content: space-between; margin-bottom: 15px; color: #666; }
    .summary-row.total { font-weight: bold; color: #333; font-size: 1.2rem; border-top: 1px solid #eee; padding-top: 15px; margin-top: 15px; }
    .checkout-btn { width: 100%; padding: 12px; background: var(--primary-600); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: background 0.2s; }
    .checkout-btn:hover:not(:disabled) { background: var(--primary-700); }
    .checkout-btn:disabled { background: #ccc; cursor: not-allowed; }
    .login-hint { margin-top: 15px; font-size: 0.9rem; text-align: center; color: #666; }
    .login-hint a { color: var(--primary-600); text-decoration: none; }
    .empty-cart { text-align: center; padding: 60px; color: #999; }
    .empty-cart svg { margin-bottom: 20px; opacity: 0.5; }
    .empty-cart p { font-size: 1.2rem; margin-bottom: 20px; }
    @media (max-width: 768px) { .cart-container { grid-template-columns: 1fr; } }
  `]
})
export class CartComponent implements OnInit {
  cartItems: BookDTO[] = [];
  total = 0;
  isLoggedIn = false;
  processing = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getCartTotal();
    });
    this.isLoggedIn = this.authService.isAuthenticated;
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  checkout() {
    if (!this.isLoggedIn) return;
    this.processing = true;
    this.cartService.checkout().subscribe({
      next: () => {
        alert('Purchase successful!');
        this.processing = false;
      },
      error: (err) => {
        console.error(err);
        alert('Checkout failed. Please try again.');
        this.processing = false;
      }
    });
  }
}
