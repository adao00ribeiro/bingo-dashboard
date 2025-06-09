import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideHttpClient, withInterceptors} from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
     provideHttpClient(withInterceptors([AuthInterceptor])),
    importProvidersFrom(BrowserAnimationsModule),
    provideRouter(routes,withComponentInputBinding()),
    provideAnimationsAsync(),
    provideEnvironmentNgxMask(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),

  ],
};
