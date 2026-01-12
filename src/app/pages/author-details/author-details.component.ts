import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import { SubscriberService } from '../../services/subscriber.service';
import { AuthService } from '../../services/auth.service';
import { AuthorDTO } from '../../models/author.model';
import { BookCardComponent } from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [CommonModule, RouterModule, BookCardComponent],
  template: `
    <div class="details-page">
      @if (loading) {
        <div class="loading">Loading details...</div>
      } @else if (author) {
        <div class="container">
          <div class="author-header">
            <div class="profile-image">
               @if (author.authorImageURL) {
                  <img [src]="author.authorImageURL" [alt]="author.name">
               } @else {
                   <img [src]="'https://i.pravatar.cc/300?u=' + author.id" [alt]="author.name">
               }
            </div>
            
            <div class="info">
              <h1>{{ author.name }}</h1>
              <p class="nationality">{{ author.nationality }}</p>
              <p class="bio">{{ author.bio }}</p>
              
              <div class="stats">
                 <div class="stat">
                    <strong>{{ author.books?.length || 0 }}</strong> Books
                 </div>
                 <div class="stat">
                    <strong>{{ author.subscribersNumber }}</strong> Subscribers
                 </div>
              </div>

              <div class="actions">
                @if (canSubscribe) {
                   <button (click)="toggleSubscription()" class="btn subscribe-btn" [class.subscribed]="isSubscribed" [disabled]="processing">
                     {{ isSubscribed ? 'Unsubscribe' : 'Subscribe' }}
                   </button>
                }
              </div>
            </div>
          </div>

          <div class="books-section">
            <h2>Books by {{ author.name }}</h2>
            @if (author.books && author.books.length > 0) {
              <div class="books-grid">
                @for (book of author.books; track book.id) {
                    <app-book-card [book]="book"></app-book-card>
                }
              </div>
            } @else {
              <p>No books available.</p>
            }
          </div>
        </div>
      } @else {
        <div class="error">Author not found</div>
      }
    </div>
  `,
  styles: [`
    .details-page { padding: 60px 0; min-height: 100vh; }
    .author-header { display: flex; gap: 40px; margin-bottom: 60px; align-items: flex-start; }
    .profile-image { width: 200px; height: 200px; border-radius: 50%; overflow: hidden; background: #eee; flex-shrink: 0; }
    .profile-image img { width: 100%; height: 100%; object-fit: cover; }
    .placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 4rem; color: #999; }
    .info { flex: 1; }
    .info h1 { margin: 0 0 10px; font-size: 2.5rem; }
    .nationality { font-size: 1.1rem; color: #666; margin-bottom: 20px; }
    .bio { line-height: 1.6; color: #444; margin-bottom: 30px; max-width: 800px; }
    .stats { display: flex; gap: 40px; margin-bottom: 30px; }
    .stat { font-size: 1.1rem; color: #666; }
    .stat strong { color: #333; font-size: 1.3rem; }
    .subscribe-btn { padding: 10px 30px; border-radius: 30px; border: 2px solid var(--primary-600); background: transparent; color: var(--primary-600); font-weight: bold; cursor: pointer; transition: all 0.2s; }
    .subscribe-btn:hover { background: var(--primary-600); color: white; }
    .subscribe-btn.subscribed { background: var(--primary-600); color: white; }
    .subscribe-btn.subscribed:hover { background: var(--error); border-color: var(--error); }
    .books-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 30px; }
    @media (max-width: 768px) { .author-header { flex-direction: column; align-items: center; text-align: center; } .stats { justify-content: center; } }
  `]
})
export class AuthorDetailsComponent implements OnInit {
  author: AuthorDTO | undefined;
  loading = true;
  isSubscribed = false;
  processing = false;
  canSubscribe = false;

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private subscriberService: SubscriberService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadAuthor(id);
      }
    });

    const user = this.authService.currentUserValue;
    this.canSubscribe = this.authService.isAuthenticated;
    // Ideally check if already subscribed here
  }

  loadAuthor(id: number) {
    this.authorService.getById(id).subscribe({
      next: (data) => {
        this.author = data;
        this.loading = false;
        this.checkSubscriptionStatus(id);
      },
      error: () => this.loading = false
    });
  }

  checkSubscriptionStatus(authorId: number) {
    const user = this.authService.currentUserValue;
    if (user && this.canSubscribe) {
      this.subscriberService.getSubscribedAuthors(user.id || '').subscribe(authors => {
        this.isSubscribed = authors.some(a => a.id === authorId);
      });
    }
  }

  toggleSubscription() {
    const user = this.authService.currentUserValue;
    if (!user || !this.author) return;

    this.processing = true;
    if (this.isSubscribed) {
      this.subscriberService.unsubscribe(user.id || '', this.author.id).subscribe({
        next: () => {
          this.isSubscribed = false;
          this.processing = false;
          if (this.author) this.author.subscribersNumber--;
        },
        error: () => this.processing = false
      });
    } else {
      this.subscriberService.subscribe(user.id || '', this.author.id).subscribe({
        next: () => {
          this.isSubscribed = true;
          this.processing = false;
          if (this.author) this.author.subscribersNumber++;
        },
        error: () => this.processing = false
      });
    }
  }
}
