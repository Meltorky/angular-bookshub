import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <!-- Logo -->
          <a routerLink="/" class="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 4H20C21.1046 4 22 4.89543 22 6V26C22 27.1046 21.1046 28 20 28H8C6.89543 28 6 27.1046 6 26V6C6 4.89543 6.89543 4 8 4Z" fill="url(#gradient1)"/>
              <path d="M10 8H18V10H10V8Z" fill="white"/>
              <path d="M10 12H18V14H10V12Z" fill="white"/>
              <path d="M10 16H15V18H10V16Z" fill="white"/>
              <defs>
                <linearGradient id="gradient1" x1="6" y1="4" x2="22" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stop-color="var(--primary-500)"/>
                  <stop offset="1" stop-color="var(--primary-700)"/>
                </linearGradient>
              </defs>
            </svg>
            <span class="logo-text">Books<span class="logo-accent">Hub</span></span>
          </a>

          <!-- Search Bar -->
          <div class="search-bar">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input 
              type="text" 
              class="search-input" 
              placeholder="Search books, authors..."
              [(ngModel)]="searchQuery"
              (keyup.enter)="onSearch()"
            />
          </div>

          <!-- User Actions -->
          <div class="header-actions">
            <a routerLink="/cart" class="cart-btn">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="cart-icon">
                 <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>
               @if (cartCount > 0) {
                 <span class="cart-badge">{{ cartCount }}</span>
               }
            </a>

            @if (isAuthenticated) {
              <div class="user-menu">
                <button class="user-button">
                  <div class="user-avatar">
                    {{ getUserInitials() }}
                  </div>
                  <span class="user-name">{{ getUserName() }}</span>
                  @if (authService.isAuthor) {
                    <span class="role-badge author-role">Author</span>
                  } @else if (authService.isSubscriber) {
                    <span class="role-badge subscriber-role">Subscriber</span>
                  } @else if (authService.isAdmin) {
                    <span class="role-badge admin-role">Admin</span>
                  }
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div class="dropdown-menu">
                  <a routerLink="/profile" class="dropdown-item">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13 14v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3V14M8 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    My Profile
                  </a>
                  <a routerLink="/dashboard" class="dropdown-item">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                    Dashboard
                  </a>
                  <button (click)="logout()" class="dropdown-item">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            } @else {
              <a routerLink="/login" class="btn btn-outline btn-sm">Login</a>
              <a routerLink="/register" class="btn btn-primary btn-sm">Sign Up</a>
            }
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header { background: rgba(255, 255, 255, 0.95); padding: 15px 0; position: sticky; top: 0; z-index: 1000; border-bottom: 1px solid #eee; backdrop-filter: blur(10px); }
    .header-content { display: flex; align-items: center; justify-content: space-between; }
    .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: #333; font-weight: bold; font-size: 1.5rem; }
    .logo-accent { color: var(--primary-600); }
    .search-bar { flex: 1; max-width: 500px; margin: 0 40px; position: relative; }
    .search-input { width: 100%; padding: 10px 10px 10px 40px; border-radius: 20px; border: 1px solid #ddd; outline: none; }
    .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #999; }
    .header-actions { display: flex; align-items: center; gap: 20px; }
    .cart-btn { position: relative; color: #333; margin-right: 15px; }
    .cart-badge { position: absolute; top: -8px; right: -8px; background: var(--error); color: white; font-size: 0.7rem; padding: 2px 5px; border-radius: 50%; }
    .user-menu { position: relative; }
    .user-button { display: flex; align-items: center; gap: 10px; background: none; border: none; cursor: pointer; padding: 5px; }
    .user-avatar { width: 32px; height: 32px; background: var(--primary-600); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }
    .dropdown-menu { display: none; position: absolute; top: 100%; right: 0; background: white; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); padding: 10px; min-width: 180px; z-index: 1001; }
    .user-menu:hover .dropdown-menu { display: block; }
    .dropdown-item { display: flex; align-items: center; gap: 10px; padding: 10px; color: #333; text-decoration: none; width: 100%; text-align: left; background: none; border: none; cursor: pointer; }
    .dropdown-item:hover { background: #f5f5f5; }
    
    .role-badge { font-size: 0.65rem; padding: 2px 6px; border-radius: 4px; font-weight: 700; text-transform: uppercase; margin-left: 5px; }
    .author-role { background: #e0f2fe; color: #0369a1; }
    .subscriber-role { background: #f0fdf4; color: #15803d; }
    .admin-role { background: #fef2f2; color: #b91c1c; }
    
    @media (max-width: 768px) { .search-bar { display: none; } .user-name { display: none; } .role-badge { display: none; } }
  `]
})
export class HeaderComponent {
  searchQuery = '';
  cartCount = 0;

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.cartService.cartItems$.subscribe(items => this.cartCount = items.length);
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { search: this.searchQuery } });
    }
  }

  get isAuthenticated(): boolean { return this.authService.isAuthenticated; }
  get isAdmin(): boolean { return this.authService.isAdmin; }
  get isAuthor(): boolean { return this.authService.isAuthor; }

  getUserName(): string {
    const user = this.authService.currentUserValue;
    return user ? `${user.firstName} ${user.lastName}` : '';
  }

  getUserInitials(): string {
    const user = this.authService.currentUserValue;
    if (!user || !user.firstName || !user.lastName) return 'U';
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
