import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private token: TokenStorageService,
    private logger: NGXLogger,
    private router: Router
  ) {}

  intercept(req: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    this.logger.log('AuthInterceptor: intercepting request');
    if (req.url.endsWith('/signIn')) {
      // Do not add Bearer token header on login request
      return next.handle(req);
    }
    // For other requests, add Bearer token if present
    const token = this.token.getToken();
    let authReq = req;
    if (token) {
      authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized globally
        if (error.status === 401) {
          this.logger.warn('Unauthorized request - logging out.');
          this.token.signOut();
          this.router.navigate(['app/auth']);
        }

        // Log error globally for debugging
        this.logger.error('HTTP Error intercepted:', error);

        // Rethrow the original error to preserve backend message & details
        return throwError(() => error);
      })
    );
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
