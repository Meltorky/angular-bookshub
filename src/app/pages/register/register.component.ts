import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    template: `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-illustration">
          <div class="illustration-content">
            <h2 class="illustration-title">Join Our Community</h2>
            <p class="illustration-text">
              Become part of a vibrant community of book lovers and discover endless possibilities.
            </p>
            <div class="illustration-features">
              <div class="feature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 4L12 14.01l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Free Account Creation</span>
              </div>
              <div class="feature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 4L12 14.01l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Exclusive Author Access</span>
              </div>
              <div class="feature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 4L12 14.01l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Personalized Library</span>
              </div>
            </div>
          </div>
        </div>

        <div class="auth-card">
          <div class="auth-header">
            <h1 class="auth-title">Create Account</h1>
            <p class="auth-subtitle">Sign up to get started with BooksHub</p>
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

          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="auth-form">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName" class="form-label">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  formControlName="firstName"
                  class="form-input"
                  [class.error]="isFieldInvalid('firstName')"
                  placeholder="John"
                />
                @if (isFieldInvalid('firstName')) {
                  <span class="form-error">First name is required</span>
                }
              </div>

              <div class="form-group">
                <label for="lastName" class="form-label">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  formControlName="lastName"
                  class="form-input"
                  [class.error]="isFieldInvalid('lastName')"
                  placeholder="Doe"
                />
                @if (isFieldInvalid('lastName')) {
                  <span class="form-error">Last name is required</span>
                }
              </div>
            </div>

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
                  @if (registerForm.get('email')?.errors?.['required']) {
                    Email is required
                  }
                  @if (registerForm.get('email')?.errors?.['email']) {
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
                  placeholder="Create a strong password"
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
                <span class="form-error">
                  @if (registerForm.get('password')?.errors?.['required']) {
                    Password is required
                  }
                  @if (registerForm.get('password')?.errors?.['minlength']) {
                    Password must be at least 6 characters
                  }
                </span>
              }
            </div>

            <div class="form-group">
              <label for="roleName" class="form-label">I want to join as</label>
              <div class="role-selector">
                <label class="role-option" [class.selected]="registerForm.get('roleName')?.value === 'Subscriber'">
                  <input
                    type="radio"
                    formControlName="roleName"
                    value="Subscriber"
                    class="role-radio"
                  />
                  <div class="role-content">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div>
                      <div class="role-title">Reader</div>
                      <div class="role-description">Discover and enjoy books</div>
                    </div>
                  </div>
                </label>

                <label class="role-option" [class.selected]="registerForm.get('roleName')?.value === 'Author'">
                  <input
                    type="radio"
                    formControlName="roleName"
                    value="Author"
                    class="role-radio"
                  />
                  <div class="role-content">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 19l7 2-7-18-7 18 7-2zm0 0v-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div>
                      <div class="role-title">Author</div>
                      <div class="role-description">Share your stories with the world</div>
                    </div>
                  </div>
                </label>
              </div>
              @if (isFieldInvalid('roleName')) {
                <span class="form-error">Please select a role</span>
              }
            </div>

            <button type="submit" class="btn btn-primary btn-lg" [disabled]="isLoading">
              @if (isLoading) {
                <span class="spinner"></span>
                Creating account...
              } @else {
                Create Account
              }
            </button>
          </form>

          <div class="auth-footer">
            <p>Already have an account? <a routerLink="/login" class="link">Sign in</a></p>
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

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-md);
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

    .role-selector {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-md);
    }

    .role-option {
      position: relative;
      cursor: pointer;
    }

    .role-radio {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }

    .role-content {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      padding: var(--spacing-md);
      border: 2px solid var(--border-light);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
    }

    .role-option:hover .role-content {
      border-color: var(--primary-300);
      background: var(--primary-50);
    }

    .role-option.selected .role-content {
      border-color: var(--primary-600);
      background: var(--primary-50);
    }

    .role-content svg {
      flex-shrink: 0;
      color: var(--primary-600);
    }

    .role-title {
      font-size: var(--text-base);
      font-weight: var(--font-semibold);
      color: var(--text-primary);
    }

    .role-description {
      font-size: var(--text-sm);
      color: var(--text-secondary);
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

      .form-row {
        grid-template-columns: 1fr;
      }

      .role-selector {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class RegisterComponent {
    registerForm: FormGroup;
    isLoading = false;
    showPassword = false;
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.maxLength(30)]],
            lastName: ['', [Validators.required, Validators.maxLength(30)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            roleName: ['Subscriber', Validators.required]
        });
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.registerForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    onSubmit(): void {
        if (this.registerForm.invalid) {
            Object.keys(this.registerForm.controls).forEach(key => {
                this.registerForm.get(key)?.markAsTouched();
            });
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        this.authService.register(this.registerForm.value).subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
            error: (error) => {
                this.isLoading = false;
                this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
            }
        });
    }
}
