import { Component, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Fiche } from "../../models/fiche";
import { Book } from "../../models/book";
import { Comment } from "../../models/comment";
import { FicheDataService } from '../../services/fiche-data.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../../services/message.service';
import { Observable } from 'rxjs/Rx';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-fiche-detail',
  templateUrl: './fiche-detail.component.html',
  styleUrls: ['./fiche-detail.component.css']
})
export class FicheDetailComponent implements OnChanges {

  public labels : any;
  public bookform : any;
  public commentform : any;

  id: string;
  uuid: string;
  fiche: Fiche;
  ficheForm: FormGroup;
  author: string;
  docx: boolean;
  isupdated : boolean;

  message: any;
  subscription: Subscription;

  constructor(
    private service: FicheDataService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private locale : LocaleService) {

    this.route.params.subscribe(params => { this.id = params['id']; this.uuid = params['uuid']; });

    this.author = this.authService.getUser().split('@')[0];

    this.createForm();

    this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });

    this.docx = false;

    this.isupdated = false;

    this.labels = locale.get("fiches");
    this.bookform = locale.get("bookform");
    this.commentform = locale.get("commentform");

  }

  createForm() {

    this.ficheForm = this.fb.group({
      title: '',
      subTitle: '',
      author: '',
      yearPub: 0,
      editor: '',
      collection: '',
      pages: 0,
      language: '',
      translation: '',
      optional_one: '',
      author_nationality: '',
      author_period: '',
      comments: this.fb.array([this.initComment(this.author)])
    });
  }

  initComment(currentAuthor: string) {
    return this.fb.group(
      {
        author: currentAuthor,
        aboutAuthor: '',
        aboutGenre: '',
        aboutCadre: '',
        aboutCharacters: '',
        resume: '',
        extrait: '',
        appreciation: '',
        submission_date: '',
        optional_one: '',
        optional_two: '',
        isCompleted: false,
        comment_text: '',
        other_details: ''
      }
    );
  }

  ngOnInit() {

    console.log('OnInit');

    this.service.getStoredFiche(this.id, this.uuid).subscribe((retrieveFiche: Fiche) => {

      this.fiche = retrieveFiche;

      this.ficheForm.patchValue({
        title: this.fiche.book.title,
        subTitle: this.fiche.book.subTitle,
        author: this.fiche.book.author,
        yearPub: this.fiche.book.yearPub,
        editor: this.fiche.book.editor,
        collection: this.fiche.book.collection,
        pages: this.fiche.book.pages,
        language: this.fiche.book.language,
        translation: this.fiche.book.translation,
        optional_one: this.fiche.book.optional_one,
        author_nationality: this.fiche.book.author_nationality,
        author_period: this.fiche.book.author_period,
      });

      console.log("inside OnInit");
      this.removeAllComments();

      this.fiche.comments.forEach((element) => {
        this.addStoredComment(element);
      });

    });
  }

  ngOnChanges() {

    console.log("OnChanges");
    
    this.service.getStoredFiche(this.id, this.uuid).subscribe((retrieveFiche: Fiche) => {

      this.fiche = retrieveFiche;

      this.ficheForm.reset({
        title: this.fiche.book.title,
        subTitle: this.fiche.book.subTitle,
        author: this.fiche.book.author,
        yearPub: this.fiche.book.yearPub,
        editor: this.fiche.book.editor,
        collection: this.fiche.book.collection,
        pages: this.fiche.book.pages,
        language: this.fiche.book.language,
        translation: this.fiche.book.translation,
        optional_one: this.fiche.book.optional_one,
        author_nationality: this.fiche.book.author_nationality,
        author_period: this.fiche.book.author_period,
      });

      this.setComments(this.fiche.comments);

    });
  }

  setComments(comments: Comment[]) {
    const commentsFGs = comments.map(comment => this.fb.group(comment));
    const commentFormArray = this.fb.array(commentsFGs);
    this.ficheForm.setControl('comments', commentFormArray);
  }

  addComment() {
    
    const control = <FormArray>this.ficheForm.controls['comments'];
    control.push(this.initComment(this.author));
    console.log("addComment new size: " + control.length);
  }

  addStoredComment(comment: any) {
    
    const control = <FormArray>this.ficheForm.controls['comments'];
    control.push(this.fb.group(comment));
  }

  removeComment(i: number) {
    
    const control = <FormArray>this.ficheForm.controls['comments'];
    control.removeAt(i);
    console.log("removeComment new size: " + control.length + " * " + i);
  }

  removeAllComments() {
    
    const control = <FormArray>this.ficheForm.controls['comments'];
    let max = control.length;
    console.log("cleaning comments from current form: " + max);
    for (var i = 0; i < max; i++) {
      control.removeAt(i);
      console.log("cleaning: " + i);
    }
  }

  onSubmit(output: FormGroup): void {
    
    console.log('you submitted value: ', output.value.comments);

    var fiche = this.service.getFiche( this.uuid, output.value );

    this.service.updateFiche( this.id, fiche ).subscribe(data => {
      if (!data.errorInd) {
        this.isupdated = true;
        this.ngOnChanges();
      }
    });
  }

  gotoFiches() {
    
    let ficheId = this.id;
    this.router.navigate(['/fiches/list', { id: ficheId }]);
  }

  createFicheDocx() {
    
    console.log('you submitted value: ', this.ficheForm.value);

    var fiche = this.service.getFiche( this.uuid, this.ficheForm.value );

    this.service.createFicheDocx( this.id, fiche ).subscribe(data => {
      if (!data.errorInd) {
        this.docx = true;
      }
    });

  }

  downloadFicheDocx() {
    
    console.log('download file button');
    this.service.getFicheDocx(this.uuid);
    this.docx = false;
    this.isupdated = false;
  }

  revert() { 

    this.ngOnChanges();
  }

  ngOnDestroy() {

    console.log('destroying');
    this.subscription.unsubscribe();
  }

}
