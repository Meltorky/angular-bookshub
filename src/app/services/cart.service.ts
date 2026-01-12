import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { BookDTO } from '../models/book.model';
import { SubscriberService } from './subscriber.service';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';
import { forkJoin, tap } from 'rxjs'; // Fix import

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItemsSubject = new BehaviorSubject<BookDTO[]>([]);
    public cartItems$ = this.cartItemsSubject.asObservable();
    private platformId = inject(PLATFORM_ID);

    constructor(
        private subscriberService: SubscriberService,
        private authService: AuthService,
        private toastService: ToastService
    ) {
        this.loadCart();
    }

    private loadCart() {
        if (isPlatformBrowser(this.platformId)) {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                this.cartItemsSubject.next(JSON.parse(savedCart));
            }
        }
    }

    private saveCart(items: BookDTO[]) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('cart', JSON.stringify(items));
        }
        this.cartItemsSubject.next(items);
    }

    addToCart(book: BookDTO) {
        const currentItems = this.cartItemsSubject.value;
        if (!currentItems.find(item => item.id === book.id)) {
            this.saveCart([...currentItems, book]);
            this.toastService.show(`"${book.name}" added to cart!`);
        } else {
            this.toastService.show(`"${book.name}" is already in your cart`, 'info');
        }
    }

    removeFromCart(bookId: number) {
        const currentItems = this.cartItemsSubject.value;
        this.saveCart(currentItems.filter(item => item.id !== bookId));
    }

    clearCart() {
        this.saveCart([]);
    }

    getCartTotal(): number {
        return this.cartItemsSubject.value.reduce((total, item) => total + item.price, 0);
    }

    checkout(): Observable<any> {
        const user = this.authService.currentUserValue;
        if (!user) {
            throw new Error('User not logged in');
        }

        const items = this.cartItemsSubject.value;
        const buyRequests = items.map(item =>
            this.subscriberService.buyBook(user.id || '', item.id) // Assuming user.id is string from AuthService
        );

        return forkJoin(buyRequests).pipe(
            tap(() => this.clearCart())
        );
    }
}
