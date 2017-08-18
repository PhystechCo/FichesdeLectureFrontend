import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FicheDataService } from '../../services/fiche-data.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../../services/message.service';
import { Fiche } from '../../models/fiche';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  errorMessage: string;
  storedFiches: Fiche[];
  selectedId: number;
  selectedUuid: string;
  userForm: FormGroup;

  message: any;
  subscription: Subscription;

  public labels : any;

  public roles = [
    { value: 'admin', display: 'Administrator' },
    { value: 'user', display: 'User' }
  ];

  constructor(private authService: AuthService, private fBuilder: FormBuilder, private service: FicheDataService, private messageService: MessageService, private locale : LocaleService) {

    this.userForm = fBuilder.group({
      username: '',
      password: '',
      role: this.roles[0].value
    });

    this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });

    this.labels = locale.get("admin");

  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.userForm.setValue({
      username: '',
      password: '',
      role: this.roles[0].value
    });
  }

  onSubmit(output: FormGroup): void {
    console.log('you submitted value: ', output.value);
    this.authService.createUser(output.value);
  }

  revert() { this.ngOnChanges(); }

  isSelected(fiche: Fiche) {
    return fiche.id === this.selectedId;
  }

  onSelect(fiche: Fiche) {
    this.selectedId = fiche.id;
    this.selectedUuid = fiche.fiche_uuid;
    this.service.deleteStoredFiche(fiche.id.toString(), fiche.fiche_uuid);
    this.getStoredFiches();
  }

  getStoredFiches() {
    this.service.getStoredFiches()
      .subscribe(
      storedFiches => this.storedFiches = storedFiches,
      error => this.errorMessage = <any>error);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  
}
