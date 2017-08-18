import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { FicheDataService } from '../../services/fiche-data.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../../services/message.service';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-fiche-add',
  templateUrl: './fiche-add.component.html',
  styleUrls: ['./fiche-add.component.css']
})
export class FicheAddComponent implements OnInit {

  author: string;
  ficheForm: FormGroup;

  message: any;
  subscription: Subscription;

  public labels : any;
  public bookform : any;
  public commentform : any;

  constructor(private service: FicheDataService, 
    private fb: FormBuilder, 
    private authService: AuthService, 
    private messageService: MessageService, 
    private locale : LocaleService) {

    this.author = this.authService.getUser().split('@')[0];

    this.ficheForm = fb.group({
      title: ['', Validators.required],
      subTitle: ['', Validators.required],
      author: ['', Validators.required],
      yearPub: 0,
      editor: '',
      collection: '',
      pages: 0,
      language: '',
      comments: fb.array([this.initComment(this.author)])
    });

    this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });

    this.labels = locale.get("fiches");
    this.bookform = locale.get("bookform");
    this.commentform = locale.get("commentform");
    
  }

  initComment(currentAuthor: string) {
    return this.fb.group({
      author: currentAuthor,
      aboutAuthor: '',
      aboutGenre: '',
      aboutCadre: '',
      aboutCharacters: '',
      resume: '',
      extrait: '',
      appreciation: '',
      isCompleted: false
    });
  }

  ngOnInit() {

    console.log("onInit> invoked");
  }

  addComment() {
    const control = <FormArray>this.ficheForm.controls['comments'];
    control.push(this.initComment(this.author));
  }

  removeComment(i: number) {
    const control = <FormArray>this.ficheForm.controls['comments'];
    control.removeAt(i);
  }

  ngOnChanges() {

    console.log("ngOnChanges> invoked");
    this.ficheForm.patchValue({
      title: '',
      subTitle: '',
      author: '',
      yearPub: 0,
      editor: '',
      collection: '',
      pages: 0,
      language: ''
    });

    const control = <FormArray>this.ficheForm.controls['comments'];
    for (var i = 0; i < control.length; i++) {
      control.at(i).patchValue(this.initComment(this.author));
    }

  }

  onSubmit(output: FormGroup): void {
    
    if (this.ficheForm.valid) {

      console.log('your submitted value: ', output.value);
      var fiche = this.service.getFiche( null, output.value );

      this.service.createFiche(fiche);
    }
  }

  revert() { 
    
    this.ngOnChanges(); 
  }

  ngOnDestroy() {

    this.subscription.unsubscribe();
  }

}
