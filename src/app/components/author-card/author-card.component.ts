import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthorDTO } from '../../models/author.model';

@Component({
  selector: 'app-author-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <a [routerLink]="['/authors', author.id]" class="author-card">
      <div class="author-image">
        @if (author.authorImageURL) {
          <img [src]="author.authorImageURL" [alt]="author.name" class="author-photo">
        } @else {
          <img [src]="'https://i.pravatar.cc/300?u=' + author.id" [alt]="author.name" class="author-photo">
        }
      </div>
      <div class="author-info">
        <h3 class="author-name">{{ author.name }}</h3>
        <p class="author-nationality">{{ author.nationality }}</p>
        <p class="author-bio">{{ author.bio }}</p>
        <div class="author-stats">
          <div class="stat">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 2h8a2 2 0 0 1 2 2v10a2 2 0 0 0-2-2H3V2z" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            <span>{{ author.books.length || 0 }} Books</span>
          </div>
          <div class="stat">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 14v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3V14" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="8" cy="5" r="3" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            <span>{{ formatNumber(author.subscribersNumber) }} Followers</span>
          </div>
        </div>
      </div>
    </a>
  `,
  styles: [`
    .author-card {
      display: flex;
      gap: var(--spacing-lg);
      padding: var(--spacing-lg);
      background: var(--bg-primary);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      text-decoration: none;
      transition: all var(--transition-base);
    }

    .author-card:hover {
      box-shadow: var(--shadow-xl);
      transform: translateY(-4px);
    }

    .author-image {
      flex-shrink: 0;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      background: var(--neutral-100);
    }

    .author-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .author-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--gradient-primary);
      color: white;
    }

    .author-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .author-name {
      font-size: var(--text-xl);
      font-weight: var(--font-bold);
      color: var(--text-primary);
      margin: 0;
    }

    .author-nationality {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      margin: 0;
    }

    .author-bio {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .author-stats {
      display: flex;
      gap: var(--spacing-lg);
      margin-top: auto;
    }

    .stat {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      font-size: var(--text-sm);
      color: var(--text-secondary);
    }

    .stat svg {
      color: var(--primary-600);
    }

    @media (max-width: 768px) {
      .author-card {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .author-image {
        width: 80px;
        height: 80px;
      }

      .author-stats {
        justify-content: center;
      }
    }
  `]
})
export class AuthorCardComponent {
  @Input({ required: true }) author!: AuthorDTO;

  formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }
}
