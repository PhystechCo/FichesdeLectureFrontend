import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { JwtService } from '../../services/jwt.service';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../../services/message.service';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {

  message: any;

  subscription: Subscription;

  public labels : any;

  constructor(public jwtservice: JwtService, private messageService: MessageService, private locale : LocaleService) {
  
    this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
    this.labels = locale.get("home");

  }

  ngOnInit() {
  
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
}
