import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="container">
        <ul class="nav-list">
          <li class="nav-item">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 7l7-5 7 5v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Home
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/books" routerLinkActive="active" class="nav-link">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 2h8a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H3V2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7 2h8a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Books
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/authors" routerLinkActive="active" class="nav-link">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M15 15v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3V15M9 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Authors
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/categories" routerLinkActive="active" class="nav-link">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 3h5v5H3V3zM10 3h5v5h-5V3zM3 10h5v5H3v-5zM10 10h5v5h-5v-5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Categories
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/books" [queryParams]="{sort: 'best-seller'}" routerLinkActive="active" class="nav-link">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2l2.5 5 5.5.75-4 3.875.95 5.375L9 14.25 4.05 17l.95-5.375-4-3.875 5.5-.75L9 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Best Sellers
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-light);
      padding: 0;
    }

    .nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: var(--spacing-sm);
    }

    .nav-item {
      position: relative;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-md) var(--spacing-lg);
      font-size: var(--text-sm);
      font-weight: var(--font-medium);
      color: var(--text-secondary);
      text-decoration: none;
      transition: all var(--transition-fast);
      position: relative;
    }

    .nav-link svg {
      color: var(--text-muted);
      transition: color var(--transition-fast);
    }

    .nav-link:hover {
      color: var(--primary-600);
    }

    .nav-link:hover svg {
      color: var(--primary-600);
    }

    .nav-link.active {
      color: var(--primary-600);
      font-weight: var(--font-semibold);
    }

    .nav-link.active svg {
      color: var(--primary-600);
    }

    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--gradient-primary);
      border-radius: var(--radius-full) var(--radius-full) 0 0;
    }

    @media (max-width: 768px) {
      .nav-list {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
      }

      .nav-list::-webkit-scrollbar {
        display: none;
      }

      .nav-link {
        padding: var(--spacing-md);
        white-space: nowrap;
      }

      .nav-link svg {
        display: none;
      }
    }
  `]
})
export class NavbarComponent { }
