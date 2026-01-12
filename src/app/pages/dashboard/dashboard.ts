import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SubscriberService } from '../../services/subscriber.service';
import { AuthorService } from '../../services/author.service';
import { BookDTO, CategoryDTO } from '../../models/book.model';
import { AuthorDTO } from '../../models/author.model';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { AuthorCardComponent } from '../../components/author-card/author-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BookCardComponent, AuthorCardComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  // User Roles
  isSubscriber = false;
  isAuthor = false;
  isAdmin = false;
  isLoading = true;

  // Subscriber Data
  boughtBooks: BookDTO[] = [];
  subscribedAuthors: AuthorDTO[] = [];
  favouriteBooks: BookDTO[] = [];

  // Author Data
  currentAuthor: AuthorDTO | undefined;
  authorBooks: BookDTO[] = [];
  totalSales = 0;
  totalEarnings = 0;

  constructor(
    public authService: AuthService,
    private subscriberService: SubscriberService,
    private authorService: AuthorService
  ) { }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.isSubscriber = this.authService.isSubscriber;
        this.isAuthor = this.authService.isAuthor;
        this.isAdmin = this.authService.isAdmin;

        let expectedLoads = 0;
        if (this.isSubscriber) expectedLoads += 2;
        if (this.isAuthor) expectedLoads += 1;

        if (expectedLoads === 0) {
          this.isLoading = false;
          return;
        }

        this.totalExpectedLoads = expectedLoads;
        this.currentLoadCount = 0;

        if (this.isSubscriber) {
          this.loadSubscriberData(user.id!);
        }
        if (this.isAuthor) {
          this.loadAuthorData(user.id!);
        }
      } else {
        this.isLoading = false;
      }
    });
  }

  private totalExpectedLoads = 0;
  private currentLoadCount = 0;

  private checkLoadingProgress() {
    this.currentLoadCount++;
    if (this.currentLoadCount >= this.totalExpectedLoads) {
      this.isLoading = false;
    }
  }

  loadSubscriberData(userId: string) {
    this.subscriberService.getBoughtBooks(userId).subscribe({
      next: (books) => {
        this.boughtBooks = books;
        this.checkLoadingProgress();
      },
      error: () => this.checkLoadingProgress()
    });

    this.subscriberService.getSubscribedAuthors(userId).subscribe({
      next: (authors) => {
        this.subscribedAuthors = authors;
        this.checkLoadingProgress();
      },
      error: () => this.checkLoadingProgress()
    });
  }

  loadAuthorData(userId: string) {
    this.authorService.getByUserId(userId).subscribe({
      next: (author) => {
        if (author) {
          this.currentAuthor = author;
          this.authorBooks = author.books || [];
          this.calculateAuthorStats();
          this.checkLoadingProgress();
        } else {
          this.checkLoadingProgress();
        }
      },
      error: () => this.checkLoadingProgress()
    });
  }

  calculateAuthorStats() {
    this.totalSales = this.authorBooks.reduce((sum, book) => sum + book.totalCopiesSold, 0);
    this.totalEarnings = this.authorBooks.reduce((sum, book) => sum + (book.totalCopiesSold * book.price), 0);
  }
}
