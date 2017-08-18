import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { MenuComponent } from '../components/menu/menu.component';
import { StatsComponent } from '../components/stats/stats.component';
import { AdminComponent } from '../components/admin/admin.component';

import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { SelectivePreloadingStrategy } from '../selective-preloading-strategy';

import { AUTHSVC_PROVIDERS } from '../services/auth.service';
import { LoggedInGuard } from '../logged-in.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'fiches', 
    canActivate: [LoggedInGuard],
    loadChildren: 'app/fiches/fiches.module#FichesModule', data: { preload: true }},
  { path: 'admin', component: AdminComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot( appRoutes, { preloadingStrategy: SelectivePreloadingStrategy } )
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [
    SelectivePreloadingStrategy
  ]
})

export class AppRoutingModule { }
