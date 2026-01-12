import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookDTO } from '../../models/book.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="book-card">
      <a [routerLink]="['/books', book.id]" class="book-cover-link">
        <div class="book-cover">
          @if (book.bookCoverURL) {
            <img [src]="book.bookCoverURL" [alt]="book.name" class="cover-image">
          } @else {
            <img [src]="'https://picsum.photos/seed/' + book.id + '/400/600'" [alt]="book.name" class="cover-image">
          }
          @if (!book.isAvailable) {
            <div class="unavailable-badge">Out of Stock</div>
          }
          @if (book.totalCopiesSold > 1000) {
            <div class="bestseller-badge">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9l-2.5 1.5.5-3.5L2.5 4.5l3.5-.5L6 1z"/>
              </svg>
              Bestseller
            </div>
          }
        </div>
      </a>
      <div class="book-info">
        <div class="book-categories">
          @for (category of book.bookCategories.slice(0, 2); track category.id) {
            <span class="category-badge">{{ category.name }}</span>
          }
        </div>
        <a [routerLink]="['/books', book.id]" class="book-title">{{ book.name }}</a>
        <a [routerLink]="['/authors', book.authorId]" class="book-author">{{ book.authorName }}</a>
        <div class="book-meta">
          <div class="book-rating">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--secondary-500)">
              <path d="M8 1l2 4 4.5.5-3.25 3 .75 4.5L8 11l-4 2 .75-4.5L1.5 5.5 6 5l2-4z"/>
            </svg>
            <span>{{ book.rating.toFixed(1) }}</span>
          </div>
          <div class="book-price">\${{ book.price.toFixed(2) }}</div>
        </div>
        <button class="add-to-cart-btn" [disabled]="!book.isAvailable" (click)="addToCart($event)">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M6 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM14 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 1h3l2.68 13.39a1.5 1.5 0 0 0 1.5 1.11h7.72a1.5 1.5 0 0 0 1.5-1.11L19 5H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ book.isAvailable ? 'Add to Cart' : 'Unavailable' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .book-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      height: 100%;
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(0,0,0,0.05);
      position: relative;
    }

    .book-card:hover {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      transform: translateY(-5px);
    }

    .book-cover-link {
      display: block;
      position: relative;
      overflow: hidden;
      aspect-ratio: 2/3;
    }

    .book-cover {
      width: 100%;
      height: 100%;
      background: #f3f4f6;
    }

    .cover-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .book-card:hover .cover-image {
      transform: scale(1.1);
    }

    .cover-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
      color: #9ca3af;
    }

    .unavailable-badge,
    .bestseller-badge {
      position: absolute;
      top: 12px;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      z-index: 10;
    }

    .unavailable-badge {
      right: 12px;
      background: #ef4444;
      color: white;
    }

    .bestseller-badge {
      left: 12px;
      background: #fbbf24;
      color: #78350f;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .book-info {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      flex: 1;
    }

    .book-categories {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .category-badge {
      padding: 2px 8px;
      background: #f3f4f6;
      color: #4b5563;
      font-size: 0.7rem;
      font-weight: 600;
      border-radius: 4px;
      text-transform: uppercase;
    }

    .book-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #111827;
      text-decoration: none;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .book-title:hover {
      color: var(--primary-600);
    }

    .book-author {
      font-size: 0.875rem;
      color: #6b7280;
      text-decoration: none;
      font-weight: 500;
      margin-top: -8px;
    }

    .book-author:hover {
      color: var(--primary-600);
    }

    .book-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 12px;
      border-top: 1px solid #f3f4f6;
    }

    .book-rating {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.875rem;
      font-weight: 600;
      color: #4b5563;
    }

    .book-price {
      font-size: 1.25rem;
      font-weight: 800;
      color: #059669;
    }

    .add-to-cart-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px;
      background: #111827;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      margin-top: 4px;
    }

    .add-to-cart-btn:hover:not(:disabled) {
      background: #374151;
      transform: translateY(-1px);
    }

    .add-to-cart-btn:disabled {
      background: #e5e7eb;
      color: #9ca3af;
      cursor: not-allowed;
    }
  `]
})
export class BookCardComponent {
  @Input({ required: true }) book!: BookDTO;

  constructor(private cartService: CartService) { }

  addToCart(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.cartService.addToCart(this.book);
    // Optional: Show toast or feedback
  }
}
