import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log("Error interceptor activated");
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                console.log("Error 401 - from backend");
                this.authenticationService.logout();
                location.reload(true);
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}

/*
    Angular 6 JWT Interceptor
    http://jasonwatmore.com/post/2018/05/23/angular-6-jwt-authentication-example-tutorial
*/