import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { StatsComponent } from './components/stats/stats.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FichesModule } from './fiches/fiches.module';

import { AUTHSVC_PROVIDERS } from './services/auth.service';
import { JWT_PROVIDERS } from './services/jwt.service';
import { MessageService } from './services/message.service';
import { LoggedInGuard } from './logged-in.guard';

import { AUTH_PROVIDERS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthConfig } from '@auth0/angular-jwt';
import { AuthModule } from './helpers/auth/auth.module';

import { AdminComponent } from './components/admin/admin.component';
import { LoaderComponent } from './services/loader/loader.component';
import { LoaderService } from './services/loader/loader.service';

import { Config } from './app.config';
import { CONFIG_PROVIDERS } from './app.config';
import { LocaleService } from './services/locale.service';
import { LOCALECONFIG_PROVIDERS } from './services/locale.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
