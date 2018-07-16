import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../services/jwt.service';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public labels : any;

  constructor(public jwtservice: JwtService, private locale : LocaleService) { 
    
    this.labels = locale.get("menu");
    
  }

  ngOnInit() {
  }

}
