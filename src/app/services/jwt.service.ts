import { Injectable } from '@angular/core';
import { JwtHelperService  } from '@auth0/angular-jwt';

@Injectable()
export class JwtService {

  constructor() { }

  jwtHelper: JwtHelperService  = new JwtHelperService ();

  hasToken(): boolean {
    var token = localStorage.getItem('token');
    if (token !== null) {
      return true;
    };
    return false;
  }

  isAdmin(): boolean {
    var token = localStorage.getItem('token');
    if (token !== null) {
      let user = this.jwtHelper.decodeToken(token)["aud"] as String;
      return user == 'admin';
    }
    return false;
  }

}

export const JWT_PROVIDERS: Array<any> = [
  { provide: JwtService, useClass: JwtService }
];