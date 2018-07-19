import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { FichesModule } from './fiches/fiches.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { StatsComponent } from './components/stats/stats.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminComponent } from './components/admin/admin.component';

import { JwtInterceptor, ErrorInterceptor } from './helpers/auth';
import { AUTHSVC_PROVIDERS } from './services/auth.service';
import { JWT_PROVIDERS } from './services/jwt.service';
import { MessageService } from './services/message.service';
import { LoggedInGuard } from './logged-in.guard';

//import { LoaderComponent } from './services/loader/loader.component';
//import { LoaderService } from './services/loader/loader.service';

import { CONFIG_PROVIDERS } from './app.config';
import { LOCALECONFIG_PROVIDERS } from './services/locale.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    StatsComponent,
    PageNotFoundComponent,
    LoginComponent,
    AdminComponent,
    //LoaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FichesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AUTHSVC_PROVIDERS,
    JWT_PROVIDERS,
    LoggedInGuard,
    MessageService,
    //LoaderService,
    CONFIG_PROVIDERS,
    LOCALECONFIG_PROVIDERS,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
  constructor( router : Router ) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }

}
