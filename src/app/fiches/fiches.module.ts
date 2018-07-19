import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FichesComponent } from './fiches.component';
import { FichesRoutingModule } from './fiches-routing.module';
import { FicheListComponent }  from './fiche-list/fiche-list.component';
import { FicheDetailComponent }  from './fiche-detail/fiche-detail.component';
import { FicheHomeComponent } from './fiche-home/fiche-home.component';
import { FicheDataService } from '../services/fiche-data.service'
import { FicheAddComponent } from './fiche-add/fiche-add.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MatProgressBarModule, MatCheckboxModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    FichesRoutingModule,
    MatProgressBarModule,
    MatCheckboxModule,
    NgxDatatableModule,
  ],
  declarations: [
    FichesComponent,
    FicheListComponent,
    FicheDetailComponent,
    FicheHomeComponent,
    FicheAddComponent
    ],
  providers: [
    FicheDataService,
  ],
  exports: [
    MatCheckboxModule,
    MatProgressBarModule,
  ]
})
export class FichesModule { }
