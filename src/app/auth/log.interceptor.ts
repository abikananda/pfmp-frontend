import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class LogInterceptor implements HttpInterceptor {

  constructor(private router: Router,private logger: NGXLogger) { }

  intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    this.logger.log('Outgoing HTTP request: '+JSON.stringify(request));
    return next.handle(request).pipe(
      tap((event: HttpEvent<object>) => {
        this.logger.log('Incoming HTTP response', event);
      })
    );
  }
}
export const logInterceptor = [
  { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true }
];
