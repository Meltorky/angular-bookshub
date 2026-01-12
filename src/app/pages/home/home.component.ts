import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BannerComponent } from '../../components/banner/banner.component';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { AuthorCardComponent } from '../../components/author-card/author-card.component';
import { BookService } from '../../services/book.service';
import { AuthorService } from '../../services/author.service';
import { BookDTO, FormBookDTO } from '../../models/book.model';
import { AuthorDTO } from '../../models/author.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BannerComponent,
    BookCardComponent,
    AuthorCardComponent
  ],
  template: `
    <div class="home-page">
      <!-- Banner Section -->
      <app-banner></app-banner>

      <!-- Best Sellers Section -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <div>
              <h2 class="section-title">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14 4l3.5 7 7.5 1-5.5 5.25 1.25 7.5L14 20.5l-6.75 4.25 1.25-7.5L3 12l7.5-1L14 4z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Best Sellers
              </h2>
              <p class="section-description">Most popular books loved by readers worldwide</p>
            </div>
            <a routerLink="/books" class="view-all-link">
              View All
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>

          @if (loadingBestSellers) {
            <div class="loading-grid">
              @for (i of [1,2,3,4]; track i) {
                <div class="skeleton-card"></div>
              }
            </div>
          } @else if (bestSellers.length > 0) {
            <div class="books-grid">
              @for (book of bestSellers; track book.id) {
                <app-book-card [book]="book"></app-book-card>
              }
            </div>
          } @else {
            <div class="empty-state">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <path d="M16 12h24a4 4 0 0 1 4 4v32a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4z" stroke="currentColor" stroke-width="2"/>
              </svg>
              <p>No best sellers available at the moment</p>
            </div>
          }
        </div>
      </section>

      <!-- Popular Books Section -->
      <section class="section section-alt">
        <div class="container">
          <div class="section-header">
            <div>
              <h2 class="section-title">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M23 14a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="2"/>
                  <path d="M14 10v4l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Popular This Week
              </h2>
              <p class="section-description">Trending books that everyone's talking about</p>
            </div>
            <a routerLink="/books" class="view-all-link">
              View All
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>

          @if (loadingPopular) {
            <div class="loading-grid">
              @for (i of [1,2,3,4]; track i) {
                <div class="skeleton-card"></div>
              }
            </div>
          } @else if (popularBooks.length > 0) {
            <div class="books-grid">
              @for (book of popularBooks; track book.id) {
                <app-book-card [book]="book"></app-book-card>
              }
            </div>
          } @else {
            <div class="empty-state">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <path d="M16 12h24a4 4 0 0 1 4 4v32a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4z" stroke="currentColor" stroke-width="2"/>
              </svg>
              <p>No popular books available at the moment</p>
            </div>
          }
        </div>
      </section>

      <!-- Hot Authors Section -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <div>
              <h2 class="section-title">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M23 24v-2a6 6 0 0 0-6-6H11a6 6 0 0 0-6 6v2M14 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Featured Authors
              </h2>
              <p class="section-description">Meet the talented authors behind your favorite books</p>
            </div>
            <a routerLink="/authors" class="view-all-link">
              View All
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>

          @if (loadingAuthors) {
            <div class="loading-list">
              @for (i of [1,2,3]; track i) {
                <div class="skeleton-author"></div>
              }
            </div>
          } @else if (hotAuthors.length > 0) {
            <div class="authors-list">
              @for (author of hotAuthors; track author.id) {
                <app-author-card [author]="author"></app-author-card>
              }
            </div>
          } @else {
            <div class="empty-state">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <path d="M32 32a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 52v-4a10 10 0 0 1 10-10h20a10 10 0 0 1 10 10v4" stroke="currentColor" stroke-width="2"/>
              </svg>
              <p>No featured authors available at the moment</p>
            </div>
          }
        </div>
      </section>

      <!-- Recently Added Section -->
      <section class="section section-alt">
        <div class="container">
          <div class="section-header">
            <div>
              <h2 class="section-title">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14 24a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" stroke="currentColor" stroke-width="2"/>
                  <path d="M14 8v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Recently Added
              </h2>
              <p class="section-description">Fresh arrivals to expand your reading list</p>
            </div>
            <a routerLink="/books" class="view-all-link">
              View All
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>

          @if (loadingRecent) {
            <div class="loading-grid">
              @for (i of [1,2,3,4]; track i) {
                <div class="skeleton-card"></div>
              }
            </div>
          } @else if (recentBooks.length > 0) {
            <div class="books-grid">
              @for (book of recentBooks; track book.id) {
                <app-book-card [book]="book"></app-book-card>
              }
            </div>
          } @else {
            <div class="empty-state">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <path d="M16 12h24a4 4 0 0 1 4 4v32a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4z" stroke="currentColor" stroke-width="2"/>
              </svg>
              <p>No recent books available at the moment</p>
            </div>
          }
        </div>
      </section>
    </div>
    `,
  styles: [`
    .home-page { min-height: 100vh; }
    .section { padding: var(--spacing-3xl) 0; }
    .section-alt { background: var(--bg-secondary); }
    .section-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: var(--spacing-2xl); }
    .section-title { display: flex; align-items: center; gap: var(--spacing-md); font-size: var(--text-3xl); font-weight: var(--font-bold); color: var(--text-primary); margin-bottom: var(--spacing-sm); }
    .section-title svg { color: var(--primary-600); }
    .section-description { font-size: var(--text-base); color: var(--text-secondary); }
    .view-all-link { display: flex; align-items: center; gap: var(--spacing-xs); font-size: var(--text-base); font-weight: var(--font-semibold); color: var(--primary-600); text-decoration: none; transition: gap var(--transition-fast); }
    .view-all-link:hover { gap: var(--spacing-sm); }
    .books-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: var(--spacing-xl); }
    .authors-list { display: flex; flex-direction: column; gap: var(--spacing-lg); }
    .loading-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: var(--spacing-xl); }
    .loading-list { display: flex; flex-direction: column; gap: var(--spacing-lg); }
    .skeleton-card { height: 400px; background: linear-gradient(90deg, var(--neutral-200) 25%, var(--neutral-100) 50%, var(--neutral-200) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: var(--radius-lg); }
    .skeleton-author { height: 120px; background: linear-gradient(90deg, var(--neutral-200) 25%, var(--neutral-100) 50%, var(--neutral-200) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: var(--radius-lg); }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: var(--spacing-3xl); text-align: center; color: var(--text-muted); }
    .empty-state svg { margin-bottom: var(--spacing-lg); opacity: 0.5; }
    .empty-state p { font-size: var(--text-lg); }
    @media (max-width: 768px) { .section { padding: var(--spacing-2xl) 0; } .section-header { flex-direction: column; align-items: flex-start; gap: var(--spacing-md); } .section-title { font-size: var(--text-2xl); } .books-grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--spacing-md); } }
  `]
})
export class HomeComponent implements OnInit {
  bestSellers: BookDTO[] = [];
  popularBooks: BookDTO[] = [];
  recentBooks: BookDTO[] = [];
  hotAuthors: AuthorDTO[] = [];

  loadingBestSellers = true;
  loadingPopular = true;
  loadingRecent = true;
  loadingAuthors = true;

  constructor(
    private bookService: BookService,
    private authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.loadBestSellers();
    this.loadPopularBooks();
    this.loadRecentBooks();
    this.loadHotAuthors();
  }

  loadBestSellers(): void {
    this.bookService.getAll({ sort: 'best-seller', pageSize: 4 }).subscribe({
      next: (response) => {
        this.bestSellers = response.slice(0, 4);
        this.loadingBestSellers = false;
      },
      error: () => {
        this.loadingBestSellers = false;
      }
    });
  }

  loadPopularBooks(): void {
    this.bookService.getAll({ sort: 'top-rated', pageSize: 4 }).subscribe({
      next: (response) => {
        this.popularBooks = response.slice(0, 4);
        this.loadingPopular = false;
      },
      error: () => {
        this.loadingPopular = false;
      }
    });
  }

  loadRecentBooks(): void {
    this.bookService.getAll({ sort: 'recentley-added', pageSize: 4 }).subscribe({
      next: (response) => {
        this.recentBooks = response.slice(0, 4);
        this.loadingRecent = false;
      },
      error: () => {
        this.loadingRecent = false;
      }
    });
  }

  loadHotAuthors(): void {
    this.authorService.getAll({ sortedBy: 'trending', resultsPerPage: 4, pageNumber: 1, isDesc: true }).subscribe({
      next: (response) => {
        this.hotAuthors = response.slice(0, 4);
        this.loadingAuthors = false;
      },
      error: () => {
        this.loadingAuthors = false;
      }
    });
  }
}
