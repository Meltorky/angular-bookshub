import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorCardComponent } from '../../components/author-card/author-card.component';
import { AuthorService } from '../../services/author.service';
import { AuthorDTO } from '../../models/author.model';

@Component({
    selector: 'app-authors',
    standalone: true,
    imports: [CommonModule, FormsModule, AuthorCardComponent],
    template: `
    <div class="authors-page">
      <div class="container">
        <div class="header">
          <h1>Featured Authors</h1>
           <div class="filters">
            <input type="text" [(ngModel)]="search" (keyup.enter)="loadAuthors()" placeholder="Search authors..." class="search-input">
            <select [(ngModel)]="sort" (change)="loadAuthors()" class="sort-select">
              <option value="trending">Trending</option>
              <option value="popular">Popular</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        @if (loading) {
          <div class="loading">Loading authors...</div>
        } @else if (authors.length > 0) {
          <div class="authors-grid">
            @for (author of authors; track author.id) {
              <app-author-card [author]="author"></app-author-card>
            }
          </div>
        } @else {
          <div class="empty">No authors found.</div>
        }
      </div>
    </div>
  `,
    styles: [`
    .authors-page { padding: 80px 0; min-height: 100vh; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
    .filters { display: flex; gap: 20px; }
    .search-input, .sort-select { padding: 10px; border-radius: 8px; border: 1px solid #ddd; }
    .authors-grid { display: flex; flex-direction: column; gap: 30px; } /* Assuming card is horizontal list style as per home */
    .loading, .empty { text-align: center; font-size: 1.2rem; color: #666; margin-top: 50px; }
  `]
})
export class AuthorsComponent implements OnInit {
    authors: AuthorDTO[] = [];
    loading = true;
    search = '';
    sort = 'trending';
    page = 1;

    constructor(private authorService: AuthorService) { }

    ngOnInit() {
        this.loadAuthors();
    }

    loadAuthors() {
        this.loading = true;
        this.authorService.getAll({
            searchText: this.search,
            sortedBy: this.sort,
            pageNumber: this.page,
            resultsPerPage: 20,
            isDesc: true
        }).subscribe({
            next: (data) => {
                this.authors = data;
                this.loading = false;
            },
            error: (e) => {
                console.error(e);
                this.loading = false;
            }
        });
    }
}
