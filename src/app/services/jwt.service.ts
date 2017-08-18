import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class JwtService {

  constructor() { }

  jwtHelper: JwtHelper = new JwtHelper();

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