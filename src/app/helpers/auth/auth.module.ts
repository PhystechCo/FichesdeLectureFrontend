import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: HttpClient, options: RequestOptions) {
  return new AuthHttp(new AuthConfig( {noTokenScheme : true } ), http, options);
}

@NgModule({
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [HttpClient, RequestOptions]
    }
  ]
})
export class AuthModule { }
