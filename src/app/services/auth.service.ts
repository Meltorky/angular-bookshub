import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/Auth`;
    private platformId = inject(PLATFORM_ID);
    private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) { }

    private getUserFromStorage(): User | null {
        if (isPlatformBrowser(this.platformId)) {
            const userJson = localStorage.getItem('currentUser');
            return userJson ? JSON.parse(userJson) : null;
        }
        return null;
    }

    get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    get isAuthenticated(): boolean {
        return !!this.currentUserValue;
    }

    get isAdmin(): boolean {
        return this.currentUserValue?.roleName.includes('Admin') || false;
    }

    get isAuthor(): boolean {
        return this.currentUserValue?.roleName.includes('Author') || false;
    }

    get isSubscriber(): boolean {
        return this.currentUserValue?.roleName.includes('Subscriber') || false;
    }

    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                const user: User = {
                    id: this.getUserIdFromToken(response.token),
                    firstName: response.firstName,
                    lastName: response.lastName,
                    email: response.email,
                    userName: response.userName,
                    roleName: response.roleName,
                    token: response.token
                };
                if (isPlatformBrowser(this.platformId)) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                this.currentUserSubject.next(user);
            })
        );
    }

    register(data: RegisterRequest): Observable<AuthResponse> {
        const formData = new FormData();
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('roleName', data.roleName);

        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, formData).pipe(
            tap(response => {
                const user: User = {
                    id: this.getUserIdFromToken(response.token),
                    firstName: response.firstName,
                    lastName: response.lastName,
                    email: response.email,
                    userName: response.userName,
                    roleName: response.roleName,
                    token: response.token
                };
                if (isPlatformBrowser(this.platformId)) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                this.currentUserSubject.next(user);
            })
        );
    }

    logout(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('currentUser');
        }
        this.currentUserSubject.next(null);
    }

    getToken(): string | null {
        return this.currentUserValue?.token || null;
    }

    private getUserIdFromToken(token: string): string | undefined {
        try {
            const payload = token.split('.')[1];
            const decoded = atob(payload);
            const json = JSON.parse(decoded);
            // Check common claim names for User ID
            return json.uid || json.sub || json.id || json['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        } catch (e) {
            console.error('Failed to decode JWT', e);
            return undefined;
        }
    }
}
