import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from './auth/auth.interceptor';
import { logInterceptor } from './auth/log.interceptor';
import { globalInterceptor } from './auth/GlobalErrorHandler';
import { LoggerModule, NgxLoggerLevel, TOKEN_LOGGER_SERVER_SERVICE } from 'ngx-logger';
import { AuthTokenServerService } from './auth/AuthTokenServerService';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withInterceptorsFromDi()), 
    provideAnimations(), 
    globalInterceptor, logInterceptor, httpInterceptorProviders,
    importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })),
    importProvidersFrom(LoggerModule.forRoot({
    // serverLoggingUrl: AppConstant.API_ENDPOINT + 'logs',
    level: NgxLoggerLevel.TRACE,
    serverLogLevel: NgxLoggerLevel.ERROR,
    // disableConsoleLogging: false
    },
    {
      serverProvider: {
        provide: TOKEN_LOGGER_SERVER_SERVICE, useClass: AuthTokenServerService
      }
    }))
  ]
};
