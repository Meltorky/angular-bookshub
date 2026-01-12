import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'books', loadComponent: () => import('./pages/books/books.component').then(m => m.BooksComponent) },
    { path: 'authors', loadComponent: () => import('./pages/authors/authors.component').then(m => m.AuthorsComponent) },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent) },
    { path: 'search', loadComponent: () => import('./pages/advanced-search/advanced-search.component').then(m => m.AdvancedSearchComponent) },
    { path: 'categories', loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent) },
    { path: 'books/:id', loadComponent: () => import('./pages/book-details/book-details.component').then(m => m.BookDetailsComponent) },
    { path: 'authors/:id', loadComponent: () => import('./pages/author-details/author-details.component').then(m => m.AuthorDetailsComponent) },
    { path: 'profile', loadComponent: () => import('./pages/profile/profile').then(m => m.ProfileComponent) },
    { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent) },
    { path: '**', redirectTo: '' }
];
