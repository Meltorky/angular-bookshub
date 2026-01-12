import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    template: `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <h1 class="auth-title">Welcome Back</h1>
            <p class="auth-subtitle">Sign in to continue to BooksHub</p>
          </div>

          @if (errorMessage) {
            <div class="alert alert-error">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="2"/>
                <path d="M10 6v4M10 14h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              {{ errorMessage }}
            </div>
          }

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="auth-form">
            <div class="form-group">
              <label for="email" class="form-label">Email Address</label>
              <input
                id="email"
                type="email"
                formControlName="email"
                class="form-input"
                [class.error]="isFieldInvalid('email')"
                placeholder="you@example.com"
              />
              @if (isFieldInvalid('email')) {
                <span class="form-error">
                  @if (loginForm.get('email')?.errors?.['required']) {
                    Email is required
                  }
                  @if (loginForm.get('email')?.errors?.['email']) {
                    Please enter a valid email
                  }
                </span>
              }
            </div>

            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <div class="password-input-wrapper">
                <input
                  id="password"
                  [type]="showPassword ? 'text' : 'password'"
                  formControlName="password"
                  class="form-input"
                  [class.error]="isFieldInvalid('password')"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  class="toggle-password"
                  (click)="showPassword = !showPassword"
                >
                  @if (showPassword) {
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z" stroke="currentColor" stroke-width="2"/>
                      <circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  } @else {
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M14.12 14.12A9.5 9.5 0 0 1 10 16c-6 0-9-6-9-6a14.5 14.5 0 0 1 3.88-4.12M6.61 6.61A4 4 0 0 1 10 5.5c6 0 9 6 9 6a14.5 14.5 0 0 1-1.39 2.39M1 1l18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  }
                </button>
              </div>
              @if (isFieldInvalid('password')) {
                <span class="form-error">Password is required</span>
              }
            </div>

            <div class="form-footer">
              <label class="checkbox-label">
                <input type="checkbox" class="checkbox">
                <span>Remember me</span>
              </label>
              <a href="#" class="link">Forgot password?</a>
            </div>

            <button type="submit" class="btn btn-primary btn-lg" [disabled]="isLoading">
              @if (isLoading) {
                <span class="spinner"></span>
                Signing in...
              } @else {
                Sign In
              }
            </button>
          </form>

          <div class="auth-footer">
            <p>Don't have an account? <a routerLink="/register" class="link">Sign up</a></p>
          </div>
        </div>

        <div class="auth-illustration">
          <div class="illustration-content">
            <h2 class="illustration-title">Start Your Reading Journey</h2>
            <p class="illustration-text">
              Join thousands of readers discovering their next favorite book every day.
            </p>
            <div class="illustration-features">
              <div class="feature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 4L12 14.01l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>10,000+ Books Available</span>
              </div>
              <div class="feature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 4L12 14.01l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>500+ Renowned Authors</span>
              </div>
              <div class="feature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 4L12 14.01l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Personalized Recommendations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .auth-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 100%);
      padding: var(--spacing-xl);
    }

    .auth-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-width: 1100px;
      width: 100%;
      background: var(--bg-primary);
      border-radius: var(--radius-2xl);
      box-shadow: var(--shadow-2xl);
      overflow: hidden;
    }

    .auth-card {
      padding: var(--spacing-3xl);
    }

    .auth-header {
      margin-bottom: var(--spacing-2xl);
    }

    .auth-title {
      font-size: var(--text-4xl);
      font-weight: var(--font-bold);
      color: var(--text-primary);
      margin-bottom: var(--spacing-sm);
    }

    .auth-subtitle {
      font-size: var(--text-base);
      color: var(--text-secondary);
    }

    .alert {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-lg);
    }

    .alert-error {
      background: rgba(239, 68, 68, 0.1);
      color: var(--error);
      border: 1px solid var(--error);
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .password-input-wrapper {
      position: relative;
    }

    .toggle-password {
      position: absolute;
      right: var(--spacing-md);
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: var(--spacing-xs);
      display: flex;
      align-items: center;
    }

    .toggle-password:hover {
      color: var(--text-secondary);
    }

    .form-input.error {
      border-color: var(--error);
    }

    .form-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      font-size: var(--text-sm);
      color: var(--text-secondary);
      cursor: pointer;
    }

    .checkbox {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    .link {
      font-size: var(--text-sm);
      color: var(--primary-600);
      font-weight: var(--font-medium);
      text-decoration: none;
    }

    .link:hover {
      text-decoration: underline;
    }

    .auth-footer {
      margin-top: var(--spacing-xl);
      text-align: center;
      font-size: var(--text-sm);
      color: var(--text-secondary);
    }

    .auth-illustration {
      background: var(--gradient-hero);
      padding: var(--spacing-3xl);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .illustration-content {
      max-width: 400px;
    }

    .illustration-title {
      font-size: var(--text-3xl);
      font-weight: var(--font-bold);
      margin-bottom: var(--spacing-md);
      color: white;
    }

    .illustration-text {
      font-size: var(--text-lg);
      margin-bottom: var(--spacing-2xl);
      opacity: 0.9;
    }

    .illustration-features {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .feature {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      font-size: var(--text-base);
    }

    .feature svg {
      flex-shrink: 0;
    }

    @media (max-width: 1024px) {
      .auth-container {
        grid-template-columns: 1fr;
      }

      .auth-illustration {
        display: none;
      }
    }

    @media (max-width: 768px) {
      .auth-page {
        padding: var(--spacing-md);
      }

      .auth-card {
        padding: var(--spacing-xl);
      }

      .auth-title {
        font-size: var(--text-3xl);
      }

      .form-footer {
        flex-direction: column;
        gap: var(--spacing-md);
        align-items: flex-start;
      }
    }
  `]
})
export class LoginComponent {
    loginForm: FormGroup;
    isLoading = false;
    showPassword = false;
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.loginForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            Object.keys(this.loginForm.controls).forEach(key => {
                this.loginForm.get(key)?.markAsTouched();
            });
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        this.authService.login(this.loginForm.value).subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
            error: (error) => {
                this.isLoading = false;
                this.errorMessage = error.error?.message || 'Invalid email or password. Please try again.';
            }
        });
    }
}
