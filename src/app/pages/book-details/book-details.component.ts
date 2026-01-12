import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { CartService } from '../../services/cart.service';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { BookDTO } from '../../models/book.model';
import { ReviewDTO } from '../../models/review.model';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="details-page">
      @if (loading) {
        <div class="loading">Loading details...</div>
      } @else if (book) {
        <div class="container">
          <div class="book-header">
            <div class="cover-wrapper">
               @if (book.bookCoverURL) {
                  <img [src]="book.bookCoverURL" [alt]="book.name" class="book-cover">
               } @else {
                   <img [src]="'https://picsum.photos/seed/' + book.id + '/600/900'" [alt]="book.name" class="book-cover">
               }
            </div>
            <div class="book-info">
              <h1 class="title">{{ book.name }}</h1>
              <a [routerLink]="['/authors', book.authorId]" class="author">by {{ book.authorName }}</a>
              
              <div class="meta">
                <span class="rating">★ {{ book.rating }}</span>
                <span class="separator">|</span>
                <span>{{ book.pageCount }} pages</span>
                <span class="separator">|</span>
                <span>{{ book.publishedDate | date }}</span>
                <span class="separator">|</span>
                <span>{{ book.language }}</span>
              </div>

              <div class="price-action">
                <div class="price">\${{ book.price.toFixed(2) }}</div>
                <button (click)="addToCart()" [disabled]="!book.isAvailable" class="add-cart-btn">
                  {{ book.isAvailable ? 'Add to Cart' : 'Out of Stock' }}
                </button>
              </div>

              <div class="description">
                <h3>Description</h3>
                <p>{{ book.description }}</p>
              </div>

              <div class="categories">
                @for (cat of book.bookCategories; track cat.id) {
                  <span class="badge">{{ cat.name }}</span>
                }
              </div>
            </div>
          </div>

          <div class="reviews-section">
            <h2>Reviews</h2>
            
            @if (canReview) {
              <div class="add-review">
                <h3>Write a Review</h3>
                <div class="rating-input">
                  <label>Rating:</label>
                  <select [(ngModel)]="newReviewRating">
                    <option [value]="5">5 - Excellent</option>
                    <option [value]="4">4 - Very Good</option>
                    <option [value]="3">3 - Good</option>
                    <option [value]="2">2 - Fair</option>
                    <option [value]="1">1 - Poor</option>
                  </select>
                </div>
                <textarea [(ngModel)]="newReviewComment" placeholder="Share your thoughts..." rows="4"></textarea>
                <button (click)="submitReview()" class="submit-btn">Post Review</button>
              </div>
            }

            <div class="reviews-list">
              @for (review of reviews; track review.createdAt) {
                <div class="review-card">
                  <div class="review-header">
                    <span class="stars">★ {{ review.rating }}</span>
                    <span class="date">{{ review.createdAt | date }}</span>
                  </div>
                  <p class="comment">{{ review.comment }}</p>
                </div>
              } @empty {
                <p class="no-reviews">No reviews yet. Be the first to review!</p>
              }
            </div>
          </div>
        </div>
      } @else {
        <div class="error-container">
          <div class="error-content">
            <h2>Book not found</h2>
            <p>The book you are looking for does not exist or has been removed.</p>
            <a routerLink="/books" class="btn-back">Browse All Books</a>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .details-page { padding: 60px 0; min-height: 100vh; }
    .error-container { display: flex; align-items: center; justify-content: center; min-height: 50vh; text-align: center; }
    .btn-back { display: inline-block; margin-top: 20px; padding: 10px 20px; background: var(--primary-600); color: white; text-decoration: none; border-radius: 8px; }
    .book-header { display: grid; grid-template-columns: 300px 1fr; gap: 40px; margin-bottom: 60px; }
    .book-cover { width: 100%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
    .placeholder-cover { width: 100%; height: 450px; background: #eee; display: flex; align-items: center; justify-content: center; border-radius: 12px; }
    .title { font-size: 2.5rem; margin-bottom: 10px; color: #333; }
    .author { font-size: 1.2rem; color: var(--primary-600); text-decoration: none; margin-bottom: 20px; display: block; }
    .meta { display: flex; gap: 15px; color: #666; font-size: 0.9rem; align-items: center; margin-bottom: 30px; }
    .price-action { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; }
    .price { font-size: 2rem; font-weight: bold; color: #333; }
    .add-cart-btn { padding: 12px 30px; background: var(--primary-600); color: white; border: none; border-radius: 30px; font-size: 1.1rem; cursor: pointer; transition: transform 0.2s; }
    .add-cart-btn:hover:enabled { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
    .add-cart-btn:disabled { background: #ccc; cursor: not-allowed; }
    .description { line-height: 1.8; color: #555; margin-bottom: 30px; }
    .categories { display: flex; gap: 10px; flex-wrap: wrap; }
    .badge { background: #f0f0f0; padding: 5px 15px; border-radius: 20px; font-size: 0.85rem; color: #555; }
    
    .reviews-section { margin-top: 60px; border-top: 1px solid #eee; padding-top: 40px; }
    .add-review { background: #f9f9f9; padding: 25px; border-radius: 12px; margin-bottom: 30px; }
    .rating-input { margin-bottom: 15px; }
    .rating-input select { padding: 8px; border-radius: 5px; border: 1px solid #ddd; margin-left: 10px; }
    textarea { width: 100%; padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 15px; font-family: inherit; }
    .submit-btn { padding: 10px 20px; background: #333; color: white; border: none; border-radius: 5px; cursor: pointer; }
    
    .review-card { padding: 20px; border-bottom: 1px solid #eee; }
    .review-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
    .stars { color: #fece3c; font-weight: bold; }
    .date { color: #999; font-size: 0.9rem; }
    .comment { color: #444; line-height: 1.6; }

    @media (max-width: 768px) { .book-header { grid-template-columns: 1fr; } .book-cover { max-width: 250px; margin: 0 auto; } }
  `]
})
export class BookDetailsComponent implements OnInit {
  book: BookDTO | undefined;
  reviews: ReviewDTO[] = [];
  loading = true;

  newReviewRating = 5;
  newReviewComment = '';
  canReview = false; // Only if logged in

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private reviewService: ReviewService,
    private cartService: CartService,
    private authService: AuthService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadBook(id);
        this.loadReviews(id);
      }
    });
    this.canReview = this.authService.isAuthenticated;
  }

  loadBook(id: number) {
    this.bookService.getById(id).subscribe({
      next: (data) => {
        this.book = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading book:', err);
        this.loading = false;
      }
    });
  }

  loadReviews(id: number) {
    this.reviewService.getBookReviews(id).subscribe(data => this.reviews = data);
  }

  addToCart() {
    if (this.book) {
      this.cartService.addToCart(this.book);
    }
  }

  submitReview() {
    if (!this.book) return;
    const user = this.authService.currentUserValue;
    if (!user) return; // Should likely redirect to login

    this.reviewService.addReview({
      userId: user.id || '',
      bookId: this.book.id,
      rating: this.newReviewRating,
      comment: this.newReviewComment
    }).subscribe({
      next: (review) => {
        this.reviews.unshift(review);
        this.newReviewComment = '';
        this.newReviewRating = 5;
        this.toastService.show('Review posted successfully!');
      },
      error: (err) => {
        const msg = err.status === 400 ? 'You have already reviewed this book.' : 'Failed to post review.';
        this.toastService.show(msg, 'error');
        console.error('Review error:', err);
      }
    });
  }
}
