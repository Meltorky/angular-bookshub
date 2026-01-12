export interface CategoryDTO {
    id: number;
    name: string;
    booksNumber?: number;
}

export interface BookDTO {
    id: number;
    name: string;
    description: string;
    language: string;
    rating: number;
    publishedDate: string;
    pageCount: number;
    price: number;
    isAvailable: boolean;
    totalCopiesSold: number;
    bookCoverURL?: string;
    bookFileURL?: string;
    authorId: number;
    authorName: string;
    bookCategories: CategoryDTO[];
}

export interface FormBookDTO {
    name: string;
    description: string;
    language: string;
    publishedDate: string;
    pageCount: number;
    price: number;
    authorId: number;
    image?: File;
    bookFile?: File;
    categoriesIds: number[];
}
