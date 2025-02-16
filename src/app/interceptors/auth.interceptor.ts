import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token-data');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
      const clonedRequest = request.clone({
        headers
      });
      return next.handle(clonedRequest);
  }
}
