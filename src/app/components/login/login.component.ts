import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public labels : any;
  public messageLabels : any;
  private returnUrl: string;

  constructor(private router: Router,
     private route: ActivatedRoute, 
     public authService: AuthService, 
     private messageService: MessageService, 
     private locale : LocaleService) { 

    this.labels = locale.get("login");
    this.messageLabels = locale.get("messages");
    
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

  login(username: string, password: string) {

    this.authService.login(username, password).subscribe(
      data => {
        this.messageService.sendMessage('notice',this.messageLabels[0].notice.welcome);
        setTimeout(function () {
          this.messageService.clearMessage();
        }.bind(this), 2500);
        this.authService.useJwtHelper();
        this.router.navigateByUrl(this.returnUrl);
      },
      error => {
        this.messageService.sendMessage('warning', this.messageLabels[0].warning.wrongcredentials);
        setTimeout(function () {
          this.messageService.clearMessage();
        }.bind(this), 2500);
      });

  }

  logout(): boolean {
    this.authService.logout();
    return false;
  }

}
