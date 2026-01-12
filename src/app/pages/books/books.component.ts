import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { BookService } from '../../services/book.service';
import { BookDTO } from '../../models/book.model';

@Component({
    selector: 'app-books',
    standalone: true,
    imports: [CommonModule, FormsModule, BookCardComponent],
    template: `
    <div class="books-page">
      <div class="container">
        <div class="header">
          <h1>Explore Books</h1>
          <div class="filters">
            <input type="text" [(ngModel)]="search" (keyup.enter)="loadBooks()" placeholder="Search books..." class="search-input">
            <select [(ngModel)]="sort" (change)="loadBooks()" class="sort-select">
              <option value="best-seller">Best Sellers</option>
              <option value="top-rated">Top Rated</option>
              <option value="recentley-added">Recently Added</option>
              <option value="price">Price (Low to High)</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        @if (loading) {
          <div class="loading">Loading books...</div>
        } @else if (books.length > 0) {
          <div class="books-grid">
            @for (book of books; track book.id) {
              <app-book-card [book]="book"></app-book-card>
            }
          </div>
        } @else {
          <div class="empty">No books found.</div>
        }
      </div>
    </div>
  `,
    styles: [`
    .books-page { padding: 80px 0; min-height: 100vh; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
    .filters { display: flex; gap: 20px; }
    .search-input, .sort-select { padding: 10px; border-radius: 8px; border: 1px solid #ddd; }
    .books-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 30px; }
    .loading, .empty { text-align: center; font-size: 1.2rem; color: #666; margin-top: 50px; }
  `]
})
export class BooksComponent implements OnInit {
    books: BookDTO[] = [];
    loading = true;
    search = '';
    sort = 'best-seller';
    page = 1;

    constructor(private bookService: BookService) { }

    ngOnInit() {
        this.loadBooks();
    }

    loadBooks() {
        this.loading = true;
        this.bookService.getAll({
            search: this.search,
            sort: this.sort,
            pageNumber: this.page,
            pageSize: 20
        }).subscribe({
            next: (data) => {
                this.books = data;
                this.loading = false;
            },
            error: (e) => {
                console.error(e);
                this.loading = false;
            }
        });
    }
}
