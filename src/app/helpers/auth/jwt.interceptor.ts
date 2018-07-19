import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let token = localStorage.getItem('token');
        if (token != null) {
            console.log('jwtinterceptor: sending token');
            request = request.clone({
                setHeaders: { 
                    Authorization: `${token}`
                }
            });
        }

        return next.handle(request);
    }
}

/*
    Angular 6 JWT Interceptor
    http://jasonwatmore.com/post/2018/05/23/angular-6-jwt-authentication-example-tutorial
*/