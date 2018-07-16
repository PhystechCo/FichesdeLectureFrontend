import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FicheDataService } from '../../services/fiche-data.service';
import { LocaleService } from '../../services/locale.service';
import { Statistics } from '../../models/statistics';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  
  public labels : any;
  
  statistics: Statistics;
  errorMessage: string;

  constructor(public authService: AuthService, private service: FicheDataService, private locale : LocaleService) {
  
    this.labels = locale.get("stats");
   }

  ngOnInit() {

    this.getStatistics();
  }

  getStatistics() {

    this.service.getStatistics().subscribe(
      data => this.statistics = data,
      error => this.errorMessage = <any>error
    );
  }

}
