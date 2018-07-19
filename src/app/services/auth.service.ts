import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

//import { LoaderService } from './loader/loader.service';
import { Config } from '../app.config';
import { BackendMessage } from '../models/backend-message';

@Injectable()
export class AuthService {

  private authSvcUrl;

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: Http,
    private authHtpp: HttpClient,
    //private loaderService: LoaderService,
    private config: Config) {

    this.authSvcUrl = this.config.get("authSvcUrl");
      
  }

  login(user: string, password: string) {

    //this.loaderService.show();

    let body = JSON.stringify({ username: user, password: password });

    return this.http.post(this.authSvcUrl + '/auth/login/', body)
      .pipe(map((response: Response) => {
        let message = response.json();
        if ((message.errorInd === false) && message.value) {
          localStorage.setItem('token', message.value);
        }
      }));
  }

  logout(): any {
    localStorage.removeItem('token');
  }

  createUser(userinfo: any) {

    console.log('new username:', userinfo['username']);
    console.log('some role:', userinfo['role']);

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    //this.loaderService.show();

    if (1) {
      this.authHtpp.post<BackendMessage>(this.authSvcUrl + "/admin/users/", JSON.stringify(userinfo), {headers: headers})
        .pipe(map((message: BackendMessage) => {
          if ((message.errorInd === false) && message.value) {
            console.log('Added new user with role: ', userinfo['role']);
          }
        })).subscribe();
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

