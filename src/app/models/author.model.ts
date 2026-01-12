import { BookDTO } from './book.model';

export interface AuthorDTO {
    id: number;
    name: string;
    nationality: string;
    bio: string;
    isActive: boolean;
    authorImageURL?: string;
    booksSold: number;
    subscribersNumber: number;
    dateOfBrith: string; // DateOnly as string
    applicationAuthorId?: string;
    books: BookDTO[];
}

export interface CreateAuthorDTO {
    name: string;
    nationality: string;
    bio: string;
    dateOfBrith: string;
    image?: File;
    applicationAuthorId?: string;
}

export interface EditAuthorDTO {
    id: number;
    name: string;
    nationality: string;
    bio: string;
    dateOfBrith: string;
    image?: File;
    isActive: boolean;
}

export interface AdvancedSearch {
    searchText?: string;
    pageNumber: number;
    resultsPerPage: number;
    sortedBy: string;
    isDesc: boolean;
}
