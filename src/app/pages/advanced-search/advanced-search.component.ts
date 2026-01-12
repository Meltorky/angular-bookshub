import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { BookDTO, CategoryDTO } from '../../models/book.model';
import { BookCardComponent } from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-advanced-search',
  standalone: true,
  imports: [CommonModule, FormsModule, BookCardComponent],
  template: `
    <div class="search-page">
      <div class="container">
        <h1>Advanced Search</h1>
        
        <div class="search-form">
          <div class="form-group">
            <label>Search Term</label>
            <input type="text" [(ngModel)]="filters.search" placeholder="Book name, author..." class="form-control">
          </div>
          
          <div class="form-group">
            <label>Category</label>
            <select [(ngModel)]="filters.categoryId" class="form-control">
              <option [value]="null">All Categories</option>
              @for (cat of categories; track cat.id) {
                <option [value]="cat.id">{{ cat.name }}</option>
              }
            </select>
          </div>
          
          <div class="form-group price-range">
            <label>Price Range</label>
            <div class="range-inputs">
               <input type="number" [(ngModel)]="filters.minPrice" placeholder="Min" class="form-control">
               <span>-</span>
               <input type="number" [(ngModel)]="filters.maxPrice" placeholder="Max" class="form-control">
            </div>
          </div>

          <div class="form-group">
            <label>Sort By</label>
             <select [(ngModel)]="filters.sort" class="form-control">
              <option value="best-seller">Best Sellers</option>
              <option value="top-rated">Top Rated</option>
              <option value="recentley-added">Recently Added</option>
              <option value="price">Price</option>
              <option value="name">Name</option>
            </select>
          </div>

          <div class="form-group">       
             <label>Order</label>
             <select [(ngModel)]="filters.isDesc" class="form-control">
               <option [value]="true">Descending</option>
               <option [value]="false">Ascending</option>
             </select>
          </div>

          <button (click)="searchBooks()" class="search-btn">Search</button>
        </div>

        <div class="results-section">
          @if (loading) {
             <div class="loading">Searching...</div>
          } @else if (hasSearched && books.length === 0) {
             <div class="no-results">No books found matching your criteria.</div>
          } @else if (books.length > 0) {
             <div class="books-grid">
               @for (book of books; track book.id) {
                 <app-book-card [book]="book"></app-book-card>
               }
             </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-page { padding: 60px 0; min-height: 100vh; }
    .search-form { background: #f9f9f9; padding: 30px; border-radius: 12px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; align-items: end; }
    .form-group label { display: block; margin-bottom: 8px; font-weight: bold; color: #555; font-size: 0.9rem; }
    .form-control { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; }
    .range-inputs { display: flex; align-items: center; gap: 10px; }
    .search-btn { padding: 12px; background: var(--primary-600); color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; height: 100%; }
    .search-btn:hover { background: var(--primary-700); }
    .loading, .no-results { text-align: center; font-size: 1.2rem; color: #666; margin-top: 50px; }
  `]
})
export class AdvancedSearchComponent implements OnInit {
  categories: CategoryDTO[] = [];
  books: BookDTO[] = [];
  loading = false;
  hasSearched = false;

  filters: any = {
    search: '',
    categoryId: null,
    minPrice: null,
    maxPrice: null,
    sort: 'best-seller',
    isDesc: true,
    pageNumber: 1,
    pageSize: 20
  };

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(data => this.categories = data);

    this.route.queryParams.subscribe(params => {
      if (params['search']) this.filters.search = params['search'];
      if (params['categoryId']) this.filters.categoryId = +params['categoryId'];
      if (params['minPrice']) this.filters.minPrice = +params['minPrice'];
      if (params['maxPrice']) this.filters.maxPrice = +params['maxPrice'];
      if (params['sort']) this.filters.sort = params['sort'];

      // Auto-search if params exist
      if (Object.keys(params).length > 0) {
        this.searchBooks();
      }
    });
  }

  searchBooks() {
    this.loading = true;
    this.hasSearched = true;
    this.bookService.getAll(this.filters).subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
