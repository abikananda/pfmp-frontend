import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private injector: Injector, private logger: NGXLogger) { }
    handleError(error: unknown) {
        const router = this.injector.get(Router);
        console.error('Global Error:', error);
        if (error instanceof HttpErrorResponse) {
            if (error.status === 401 || error.status === 403) {
                router.navigate(['app/auth']);
            }
        } else {
            alert('An unexpected error occurred. Please try again.');
        }
    }
}
export const globalInterceptor = [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
];