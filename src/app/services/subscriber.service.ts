import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BookDTO } from '../models/book.model';
import { AuthorDTO } from '../models/author.model';

@Injectable({
    providedIn: 'root'
})
export class SubscriberService {
    private apiUrl = `${environment.apiUrl}/Subscribers`;

    constructor(private http: HttpClient) { }

    subscribe(userId: string, authorId: number): Observable<void> {
        const params = new HttpParams().set('userId', userId).set('authorId', authorId.toString());
        return this.http.post<void>(`${this.apiUrl}/subscribe`, {}, { params });
    }

    unsubscribe(userId: string, authorId: number): Observable<void> {
        const params = new HttpParams().set('userId', userId).set('authorId', authorId.toString());
        return this.http.delete<void>(`${this.apiUrl}/unsubscribe`, { params });
    }

    getSubscribedAuthors(userId: string): Observable<AuthorDTO[]> {
        return this.http.get<AuthorDTO[]>(`${this.apiUrl}/${userId}/authors`);
    }

    buyBook(userId: string, bookId: number): Observable<void> {
        const params = new HttpParams().set('userId', userId).set('bookId', bookId.toString());
        return this.http.post<void>(`${this.apiUrl}/buy`, {}, { params });
    }

    getBoughtBooks(userId: string): Observable<BookDTO[]> {
        return this.http.get<BookDTO[]>(`${this.apiUrl}/${userId}/books`);
    }
}
