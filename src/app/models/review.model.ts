export interface ReviewDTO {
    id?: number; // Might be useful if backend returns it, though swagger DTO didn't explicitly show it in one view but usually needed for delete/edit
    rating: number;
    comment: string;
    createdAt: string;
    userName?: string; // Often returned to show who wrote it
}

export interface AddReviewDTO {
    userId: string;
    bookId: number;
    rating: number;
    comment: string;
}
