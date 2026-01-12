import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CategoryDTO } from '../models/book.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiUrl = `${environment.apiUrl}/Category`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<CategoryDTO[]> {
        return this.http.get<CategoryDTO[]>(`${this.apiUrl}/all`);
    }

    getPopular(): Observable<CategoryDTO[]> {
        return this.http.get<CategoryDTO[]>(`${this.apiUrl}/popular`);
    }
}
