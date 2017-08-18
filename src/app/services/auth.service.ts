import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';
import { AuthHttp } from 'angular2-jwt';

import { LoaderService } from './loader/loader.service';

import { Config } from '../app.config';

@Injectable()
export class AuthService {

  private authSvcUrl;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http,
    public authHttp: AuthHttp,
    private loaderService: LoaderService,
    private config: Config) {

    this.authSvcUrl = this.config.get("authSvcUrl");

  }

  login(user: string, password: string) {

    this.loaderService.show();

    let body = JSON.stringify({ username: user, password: password });

    return this.http.post(this.authSvcUrl + '/auth/login/', body)
      .map((response: Response) => {
        let message = response.json();
        if ((message.errorInd === false) && message.value) {
          localStorage.setItem('token', message.value);
        }
      })
      .finally(() => {
        this.loaderService.hide()
      });
  }

  logout(): any {
    localStorage.removeItem('token');
  }

  createUser(userinfo: any) {

    console.log('new username:', userinfo['username']);
    console.log('some role:', userinfo['role']);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.loaderService.show();

    if (1) {
      this.authHttp.post(this.authSvcUrl + "/admin/users/", JSON.stringify(userinfo), options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
        .finally(() => {
          this.loaderService.hide()
        })
        .subscribe();
    }


  }

  getUser(): any {
    var token = localStorage.getItem('token');
    if (token !== null) {
      let user = this.jwtHelper.decodeToken(token)["sub"];
      return user;
    }
    return null;
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  useJwtHelper() {
    var token = localStorage.getItem('token');
    console.log(token);

    console.log(
      this.jwtHelper.decodeToken(token),
      this.jwtHelper.getTokenExpirationDate(token),
      this.jwtHelper.isTokenExpired(token)
    );
    console.log(this.jwtHelper.decodeToken(token)["sub"]);
  }


}

export const AUTHSVC_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];

