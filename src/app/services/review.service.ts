import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ReviewDTO, AddReviewDTO } from '../models/review.model';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    private apiUrl = `${environment.apiUrl}/Reviews`;

    constructor(private http: HttpClient) { }

    addReview(review: AddReviewDTO): Observable<ReviewDTO> {
        return this.http.post<ReviewDTO>(`${this.apiUrl}/add`, review);
    }

    getBookReviews(bookId: number): Observable<ReviewDTO[]> {
        return this.http.get<ReviewDTO[]>(`${this.apiUrl}/book/${bookId}`);
    }
}
