import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocaleService } from '../services/locale.service';

@Component({
  templateUrl: './fiches.component.html',
  styleUrls: ['./fiches.component.css']
})
export class FichesComponent { 

  public labels : any;

  constructor(private router: Router, private route: ActivatedRoute, private locale : LocaleService) { 

    this.labels = locale.get("fiches");
    console.log(this.labels);
  };

  goToFiche(id: string): void {
    this.router.navigate(['./id/', id], {relativeTo: this.route});
  }

}
