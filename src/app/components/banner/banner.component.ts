import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-banner',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <section class="banner">
      <div class="container">
        <div class="banner-content">
          <div class="banner-text">
            <span class="badge badge-accent">New Arrivals Every Week</span>
            <h1 class="banner-title">
              Discover Your Next
              <span class="gradient-text">Favorite Book</span>
            </h1>
            <p class="banner-description">
              Explore thousands of books from bestselling authors, hidden gems, and timeless classics. 
              Your literary adventure starts here.
            </p>
            <div class="banner-actions">
              <a routerLink="/books" class="btn btn-primary btn-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Browse Books
              </a>
              <a routerLink="/bestsellers" class="btn btn-outline btn-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2l2.5 5 5.5.75-4 3.875.95 5.375L10 14.25 5.05 17l.95-5.375-4-3.875 5.5-.75L10 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Best Sellers
              </a>
            </div>
            <div class="banner-stats">
              <div class="stat">
                <div class="stat-value">10K+</div>
                <div class="stat-label">Books</div>
              </div>
              <div class="stat">
                <div class="stat-value">500+</div>
                <div class="stat-label">Authors</div>
              </div>
              <div class="stat">
                <div class="stat-value">50K+</div>
                <div class="stat-label">Readers</div>
              </div>
            </div>
          </div>
          <div class="banner-image">
            <div class="floating-card card-1">
              <div class="book-cover"></div>
              <div class="book-info">
                <div class="book-title">The Great Novel</div>
                <div class="book-rating">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="var(--secondary-500)">
                    <path d="M7 1l1.5 3 3.5.5-2.5 2.5.5 3.5L7 9l-2.5 1.5.5-3.5L2.5 4.5l3.5-.5L7 1z"/>
                  </svg>
                  4.8
                </div>
              </div>
            </div>
            <div class="floating-card card-2">
              <div class="book-cover"></div>
              <div class="book-info">
                <div class="book-title">Mystery Tales</div>
                <div class="book-rating">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="var(--secondary-500)">
                    <path d="M7 1l1.5 3 3.5.5-2.5 2.5.5 3.5L7 9l-2.5 1.5.5-3.5L2.5 4.5l3.5-.5L7 1z"/>
                  </svg>
                  4.9
                </div>
              </div>
            </div>
            <div class="floating-card card-3">
              <div class="book-cover"></div>
              <div class="book-info">
                <div class="book-title">Science Fiction</div>
                <div class="book-rating">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="var(--secondary-500)">
                    <path d="M7 1l1.5 3 3.5.5-2.5 2.5.5 3.5L7 9l-2.5 1.5.5-3.5L2.5 4.5l3.5-.5L7 1z"/>
                  </svg>
                  5.0
                </div>
              </div>
            </div>
            <div class="decoration-circle circle-1"></div>
            <div class="decoration-circle circle-2"></div>
          </div>
        </div>
      </div>
    </section>
  `,
    styles: [`
    .banner {
      background: linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 100%);
      padding: var(--spacing-3xl) 0;
      overflow: hidden;
      position: relative;
    }

    .banner-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-3xl);
      align-items: center;
    }

    .banner-text {
      animation: slideInLeft 0.8s ease-out;
    }

    .banner-title {
      font-size: var(--text-5xl);
      font-weight: var(--font-extrabold);
      line-height: 1.1;
      margin: var(--spacing-lg) 0;
      color: var(--text-primary);
    }

    .gradient-text {
      background: var(--gradient-hero);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: block;
    }

    .banner-description {
      font-size: var(--text-lg);
      color: var(--text-secondary);
      margin-bottom: var(--spacing-xl);
      line-height: 1.7;
    }

    .banner-actions {
      display: flex;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-2xl);
    }

    .banner-stats {
      display: flex;
      gap: var(--spacing-2xl);
      padding-top: var(--spacing-xl);
      border-top: 1px solid var(--border-light);
    }

    .stat {
      text-align: center;
    }

    .stat-value {
      font-size: var(--text-3xl);
      font-weight: var(--font-bold);
      color: var(--primary-600);
      margin-bottom: var(--spacing-xs);
    }

    .stat-label {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .banner-image {
      position: relative;
      height: 500px;
      animation: slideInRight 0.8s ease-out;
    }

    .floating-card {
      position: absolute;
      background: white;
      border-radius: var(--radius-xl);
      padding: var(--spacing-md);
      box-shadow: var(--shadow-2xl);
      animation: float 3s ease-in-out infinite;
      cursor: pointer;
      transition: transform var(--transition-base);
    }

    .floating-card:hover {
      transform: translateY(-10px) !important;
    }

    .card-1 {
      top: 10%;
      left: 10%;
      animation-delay: 0s;
    }

    .card-2 {
      top: 40%;
      right: 10%;
      animation-delay: 0.5s;
    }

    .card-3 {
      bottom: 10%;
      left: 20%;
      animation-delay: 1s;
    }

    .book-cover {
      width: 120px;
      height: 160px;
      background: var(--gradient-primary);
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-sm);
      box-shadow: var(--shadow-lg);
    }

    .card-2 .book-cover {
      background: var(--gradient-secondary);
    }

    .card-3 .book-cover {
      background: var(--gradient-accent);
    }

    .book-info {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    .book-title {
      font-size: var(--text-sm);
      font-weight: var(--font-semibold);
      color: var(--text-primary);
    }

    .book-rating {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      font-size: var(--text-sm);
      font-weight: var(--font-medium);
      color: var(--text-secondary);
    }

    .decoration-circle {
      position: absolute;
      border-radius: 50%;
      opacity: 0.1;
      z-index: -1;
    }

    .circle-1 {
      width: 300px;
      height: 300px;
      background: var(--primary-500);
      top: -50px;
      right: -50px;
    }

    .circle-2 {
      width: 200px;
      height: 200px;
      background: var(--secondary-500);
      bottom: -50px;
      left: -50px;
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }

    @media (max-width: 1024px) {
      .banner-content {
        grid-template-columns: 1fr;
        gap: var(--spacing-2xl);
      }

      .banner-image {
        height: 400px;
      }

      .banner-title {
        font-size: var(--text-4xl);
      }
    }

    @media (max-width: 768px) {
      .banner {
        padding: var(--spacing-2xl) 0;
      }

      .banner-title {
        font-size: var(--text-3xl);
      }

      .banner-description {
        font-size: var(--text-base);
      }

      .banner-actions {
        flex-direction: column;
      }

      .banner-stats {
        gap: var(--spacing-lg);
      }

      .stat-value {
        font-size: var(--text-2xl);
      }

      .banner-image {
        height: 300px;
      }

      .book-cover {
        width: 80px;
        height: 110px;
      }
    }
  `]
})
export class BannerComponent { }
