import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';
import { FicheDataService } from '../../services/fiche-data.service';
import { Fiche } from '../../models/fiche';
import { MessageService } from '../../services/message.service';
import { LocaleService } from '../../services/locale.service';

@Component({
  templateUrl: './fiche-list.component.html',
  styleUrls: ['./fiche-list.component.css']
})
export class FicheListComponent implements OnInit {

  public labels: any;

  errorMessage: string;
  storedFiches: Fiche[];
  xlsx: boolean;
  isupdated: boolean;

  selectedId: number;
  selectedUuid: string;

  selected = [];
  rows: Observable<any[]>;
  columns = [];

  message: any;
  subscription: Subscription;

  constructor(
    private service: FicheDataService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private locale: LocaleService) {

    this.labels = locale.get("fiches");

    this.columns.push({ 'name': this.labels[0].list.col1 });
    this.columns.push({ 'name': this.labels[0].list.col2 });
    this.columns.push({ 'name': this.labels[0].list.col3 });
    this.columns.push({ 'name': this.labels[0].list.col4 });

    console.log(this.columns);

    this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });

  }

  ngOnInit() {

    this.rows = Observable.create((subs) => {
      this.getStoredFiches(

        (data) => {
          subs.next(data);
          subs.complete();
        });
    });

  }


  //... select
  onSelect({ selected }) {

    console.log('Select Event', selected, this.selected);
    return selected.id === this.selectedId;
  }

  //... click
  onActivate(event) {

    console.log('Activate Event', event.row);
    this.selectedId = +event.row.id;
    this.selectedUuid = this.storedFiches[this.selectedId - 1].fiche_uuid;
    this.router.navigate(['../' + this.selectedId + '/' + this.selectedUuid], { relativeTo: this.route });
  }

  getStoredFiches(cb) {

    this.service.getStoredFiches()
      .subscribe(
      storedFiches => {

        this.storedFiches = storedFiches;
        let rows = [];

        for (var i = 0; i < this.storedFiches.length; i++)
          rows.push({
            'id': (i + 1).toString(),
            'title': this.storedFiches[i].book.title,
            'author': this.storedFiches[i].book.author,
            'optional_one': this.storedFiches[i].book.optional_one,
          })
        console.log(rows);
        cb(rows);

      }
      );
  }

  createFicheXlsx() {

    console.log('you submitted value: ');

    this.service.createFicheXlsx(this.storedFiches).subscribe(data => {
      if (!data.errorInd) {
        this.xlsx = true;
      }
    });

  }

  downloadFicheXlsx() {

    console.log('download file button');

    this.service.getFicheXlsx();
    this.xlsx = false;
    this.isupdated = false;

  }

  ngOnDestroy() {

    console.log('destroying');
    this.subscription.unsubscribe();
  }


}
