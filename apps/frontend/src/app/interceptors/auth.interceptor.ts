import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { JWTService } from '../services/jwt.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private jwtSrv: JWTService,
              private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.includes('login')) {
      return next.handle(request);
    }

    const authToken = this.jwtSrv.getToken();
    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`)
    });

    return next.handle(authToken ? authReq : request)
      // .pipe(
      //   catchError(err => {
      //     if (err.status) {
      //       this.jwtSrv.removeToken();
      //       this.router.navigate(['/login']);
      //     }
      //     return throwError(() => err);
      //   })
      // )
  }
}
