import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const platformId = inject(PLATFORM_ID);

    if (isPlatformBrowser(platformId)) {
        const userJson = localStorage.getItem('currentUser');

        if (userJson) {
            const user = JSON.parse(userJson);
            const token = user.token;

            if (token) {
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
        }
    }

    return next(req);
};
