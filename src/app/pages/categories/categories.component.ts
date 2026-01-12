import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CategoryDTO } from '../../models/book.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="categories-page">
      <div class="container">
        <h1>Categories</h1>
        
        @if (loading) {
          <div class="loading">Loading categories...</div>
        } @else {
           <div class="categories-grid">
             @for (cat of categories; track cat.id) {
               <a [routerLink]="['/search']" [queryParams]="{ categoryId: cat.id }" class="category-card">
                 <div class="icon">
                   <!-- Fallback icon -->
                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                     <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke-width="2"/>
                     <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke-width="2"/>
                   </svg>
                 </div>
                 <h3>{{ cat.name }}</h3>
                 <span class="count">{{ cat.booksNumber }} Books</span>
               </a>
             }
           </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .categories-page { padding: 80px 0; min-height: 100vh; }
    .categories-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 30px; }
    .category-card { background: white; padding: 30px; border-radius: 12px; text-decoration: none; color: inherit; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transition: transform 0.2s; display: flex; flex-direction: column; align-items: center; text-align: center; }
    .category-card:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0,0,0,0.1); }
    .icon { margin-bottom: 20px; color: var(--primary-600); }
    .category-card h3 { margin: 0 0 10px; font-size: 1.2rem; }
    .count { color: #888; font-size: 0.9rem; }
  `]
})
export class CategoriesComponent implements OnInit {
  categories: CategoryDTO[] = [];
  loading = true;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
