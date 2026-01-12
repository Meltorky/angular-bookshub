import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <!-- About Section -->
          <div class="footer-section">
            <h3 class="footer-title">
              <span class="logo-text">Books<span class="logo-accent">Hub</span></span>
            </h3>
            <p class="footer-text">
              Your ultimate destination for discovering, exploring, and enjoying the best books from around the world.
            </p>
            <div class="social-links">
              <a href="#" class="social-link" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0C7.284 0 6.944.012 5.877.06 4.813.11 4.086.278 3.45.525a4.902 4.902 0 00-1.772 1.153A4.902 4.902 0 00.525 3.45C.278 4.086.11 4.813.06 5.877.012 6.944 0 7.284 0 10s.012 3.056.06 4.123c.05 1.064.218 1.791.465 2.427a4.902 4.902 0 001.153 1.772 4.902 4.902 0 001.772 1.153c.636.247 1.363.415 2.427.465C6.944 19.988 7.284 20 10 20s3.056-.012 4.123-.06c1.064-.05 1.791-.218 2.427-.465a4.902 4.902 0 001.772-1.153 4.902 4.902 0 001.153-1.772c.247-.636.415-1.363.465-2.427.048-1.067.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.05-1.064-.218-1.791-.465-2.427a4.902 4.902 0 00-1.153-1.772A4.902 4.902 0 0016.55.525C15.914.278 15.187.11 14.123.06 13.056.012 12.716 0 10 0zm0 1.802c2.67 0 2.987.01 4.041.059.975.045 1.504.207 1.857.344.466.182.8.398 1.15.748.35.35.566.684.748 1.15.137.353.3.882.344 1.857.048 1.054.058 1.37.058 4.04 0 2.671-.01 2.987-.058 4.042-.045.975-.207 1.504-.344 1.857a3.097 3.097 0 01-.748 1.15c-.35.35-.684.566-1.15.748-.353.137-.882.3-1.857.344-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-.975-.045-1.504-.207-1.857-.344a3.097 3.097 0 01-1.15-.748 3.098 3.098 0 01-.748-1.15c-.137-.353-.3-.882-.344-1.857-.048-1.055-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.045-.976.207-1.505.344-1.858.182-.466.399-.8.748-1.15.35-.35.684-.566 1.15-.748.353-.137.882-.3 1.857-.344 1.054-.048 1.37-.058 4.04-.058zM10 13.333a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm0-8.468a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm6.538-.203a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M18.521 0H1.476C.66 0 0 .645 0 1.441v17.118C0 19.355.66 20 1.476 20h17.045c.815 0 1.479-.645 1.479-1.441V1.441C20 .645 19.336 0 18.521 0zM5.923 17.042H2.963V7.499h2.96v9.543zM4.443 6.194a1.72 1.72 0 110-3.439 1.72 1.72 0 010 3.439zm12.599 10.848h-2.957v-4.64c0-1.106-.02-2.529-1.541-2.529-1.542 0-1.778 1.204-1.778 2.447v4.722H8.81V7.499h2.838v1.305h.04c.395-.748 1.36-1.54 2.799-1.54 2.994 0 3.545 1.97 3.545 4.533v5.245z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-section">
            <h4 class="footer-heading">Quick Links</h4>
            <ul class="footer-links">
              <li><a routerLink="/" class="footer-link">Home</a></li>
              <li><a routerLink="/books" class="footer-link">Browse Books</a></li>
              <li><a routerLink="/authors" class="footer-link">Authors</a></li>
              <li><a routerLink="/bestsellers" class="footer-link">Best Sellers</a></li>
            </ul>
          </div>

          <!-- Categories -->
          <div class="footer-section">
            <h4 class="footer-heading">Categories</h4>
            <ul class="footer-links">
              <li><a href="#" class="footer-link">Fiction</a></li>
              <li><a href="#" class="footer-link">Non-Fiction</a></li>
              <li><a href="#" class="footer-link">Science</a></li>
              <li><a href="#" class="footer-link">Technology</a></li>
            </ul>
          </div>

          <!-- Support -->
          <div class="footer-section">
            <h4 class="footer-heading">Support</h4>
            <ul class="footer-links">
              <li><a href="#" class="footer-link">Help Center</a></li>
              <li><a href="#" class="footer-link">Contact Us</a></li>
              <li><a href="#" class="footer-link">Privacy Policy</a></li>
              <li><a href="#" class="footer-link">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div class="footer-bottom">
          <p class="copyright">
            © {{ currentYear }} BooksHub. All rights reserved.
          </p>
          <p class="footer-text-small">
            Made with <span class="heart">❤️</span> for book lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  `,
    styles: [`
    .footer {
      background: var(--gradient-dark);
      color: var(--text-light);
      padding: var(--spacing-3xl) 0 var(--spacing-xl);
      margin-top: var(--spacing-3xl);
    }

    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: var(--spacing-2xl);
      margin-bottom: var(--spacing-2xl);
    }

    .footer-section {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .footer-title {
      margin-bottom: var(--spacing-sm);
    }

    .logo-text {
      font-family: var(--font-display);
      font-size: var(--text-2xl);
      font-weight: var(--font-bold);
      color: var(--text-light);
    }

    .logo-accent {
      color: var(--primary-400);
    }

    .footer-text {
      color: var(--neutral-300);
      font-size: var(--text-sm);
      line-height: 1.6;
      margin-bottom: var(--spacing-md);
    }

    .social-links {
      display: flex;
      gap: var(--spacing-md);
    }

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      color: var(--text-light);
      transition: all var(--transition-base);
    }

    .social-link:hover {
      background: var(--primary-600);
      transform: translateY(-3px);
    }

    .footer-heading {
      font-size: var(--text-lg);
      font-weight: var(--font-semibold);
      color: var(--text-light);
      margin-bottom: var(--spacing-sm);
    }

    .footer-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .footer-link {
      color: var(--neutral-300);
      font-size: var(--text-sm);
      text-decoration: none;
      transition: color var(--transition-fast);
    }

    .footer-link:hover {
      color: var(--primary-400);
    }

    .footer-bottom {
      padding-top: var(--spacing-xl);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
    }

    .copyright {
      color: var(--neutral-300);
      font-size: var(--text-sm);
      margin-bottom: var(--spacing-sm);
    }

    .footer-text-small {
      color: var(--neutral-400);
      font-size: var(--text-xs);
    }

    .heart {
      color: var(--accent-500);
      animation: heartbeat 1.5s ease-in-out infinite;
    }

    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    @media (max-width: 1024px) {
      .footer-content {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 768px) {
      .footer {
        padding: var(--spacing-2xl) 0 var(--spacing-lg);
      }

      .footer-content {
        grid-template-columns: 1fr;
        gap: var(--spacing-xl);
      }
    }
  `]
})
export class FooterComponent {
    currentYear = new Date().getFullYear();
}
