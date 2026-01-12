import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AdvancedSearch, AuthorDTO, CreateAuthorDTO, EditAuthorDTO } from '../models/author.model';

@Injectable({
    providedIn: 'root'
})
export class AuthorService {
    private apiUrl = `${environment.apiUrl}/Authors`;

    constructor(private http: HttpClient) { }

    getAll(searchParams: AdvancedSearch): Observable<AuthorDTO[]> {
        let params = new HttpParams()
            .set('pageNumber', searchParams.pageNumber ? searchParams.pageNumber.toString() : '1')
            .set('pageSize', searchParams.resultsPerPage ? searchParams.resultsPerPage.toString() : '10')
            .set('sort', searchParams.sortedBy || 'trending')
            .set('isDesc', searchParams.isDesc !== undefined ? searchParams.isDesc.toString() : 'true');

        if (searchParams.searchText) {
            params = params.set('search', searchParams.searchText);
        }

        return this.http.get<AuthorDTO[]>(`${this.apiUrl}/All`, { params });
    }

    getById(id: number): Observable<AuthorDTO> {
        return this.http.get<AuthorDTO>(`${this.apiUrl}/${id}/details`);
    }

    simpleGetById(id: number): Observable<AuthorDTO> {
        return this.http.get<AuthorDTO>(`${this.apiUrl}/${id}`);
    }

    getByUserId(userId: string): Observable<AuthorDTO | null> {
        return this.http.get<AuthorDTO | null>(`${this.apiUrl}/user/${userId}`);
    }

    createProfileAdmin(dto: CreateAuthorDTO): Observable<AuthorDTO> {
        const formData = this.createFormData(dto);
        return this.http.post<AuthorDTO>(`${this.apiUrl}/admin/create-profile`, formData);
    }

    createProfileUser(userId: string, dto: CreateAuthorDTO): Observable<AuthorDTO> {
        const formData = this.createFormData(dto);
        return this.http.post<AuthorDTO>(`${this.apiUrl}/author/create-profile/${userId}`, formData);
    }

    edit(dto: EditAuthorDTO): Observable<AuthorDTO> {
        const formData = new FormData();
        formData.append('Id', dto.id.toString());
        formData.append('Name', dto.name);
        formData.append('Nationality', dto.nationality);
        formData.append('Bio', dto.bio);
        formData.append('DateOfBrith', dto.dateOfBrith);
        formData.append('IsActive', dto.isActive.toString());
        if (dto.image) {
            formData.append('Image', dto.image);
        }

        return this.http.put<AuthorDTO>(`${this.apiUrl}/edit`, formData);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }

    private createFormData(dto: any): FormData {
        const formData = new FormData();
        for (const key in dto) {
            if (dto[key] !== undefined && dto[key] !== null) {
                // Simple key matching, might need mapping if backend keys differ significantly
                // Backend expects PascalCase often, let's checking DTOs.
                // DTOs use normal properties. FromForm uses Property names.
                // Backend DTO: Name, Nationality, etc. (PascalCase properties).
                // Frontend dto: name, nationality (camelCase).
                // I should capitalize the first letter.
                const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
                if (key === 'image' || key === 'authorImageFile') {
                    // Backend expects "Image"? Let's check Controller.
                    // Controller: [FromForm] CreateAuthorDTO.
                    // CreateAuthorDTO.cs -> public IFormFile? AuthorImageFile { get; set; }
                    if (key === 'image') {
                        formData.append('AuthorImageFile', dto[key]);
                        return formData; // Assuming strictly typed call, but loop continues
                    }
                }
                formData.append(pascalKey, dto[key]);
            }
        }
        return formData;
    }
}
