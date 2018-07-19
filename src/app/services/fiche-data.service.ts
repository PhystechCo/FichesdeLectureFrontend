import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as FileSaver from 'file-saver';

//import { LoaderService } from './loader/loader.service';

import { MessageService } from '../services/message.service';

import { Fiche } from "../models/fiche";
import { IFiche } from "../models/interfaces";
import { Statistics } from '../models/statistics';
import { BackendMessage } from '../models/backend-message';

import { Config } from '../app.config';
import { LocaleService } from './locale.service';


@Injectable()
export class FicheDataService {

  private backendUrl;
  private svcDocxUrl;

  public labels: any;

  contentHeaders = new Headers();

  constructor(private http: Http,
    public authHttp: HttpClient,
    private messageService: MessageService,
    //private loaderService: LoaderService,
    private config: Config,
    private locale: LocaleService) {

    this.contentHeaders.append('Accept', 'application/json');
    this.contentHeaders.append('Content-Type', 'application/json');

    this.backendUrl = this.config.get("backendUrl");
    this.svcDocxUrl = this.config.get("svcDocxUrl");

    this.labels = locale.get("messages");
    console.log(this.labels);

  }

  //POST 1.
  createFiche(fiche: Fiche) {

    //this.loaderService.show();

    let headers = new HttpHeaders({ 'Accept' : 'application/json', 'Content-Type': 'application/json' });

    if (1) {

      console.log(JSON.stringify(fiche));

      this.authHttp.post<BackendMessage>(this.backendUrl + "/users/fiches/", JSON.stringify(fiche), {headers: headers})
        .pipe(map((message: BackendMessage) => {
          if ((message.errorInd === false) && message.value) {
            this.messageService.sendMessage('success', this.labels[0].success.added);
            setTimeout(function () {
              this.messageService.clearMessage();
            }.bind(this), 4500);
          }
        })
      ).subscribe();
    }
  }

  //POST 2.
  updateFiche(id: string, fiche: Fiche) {

    //this.loaderService.show();

    let headers = new HttpHeaders({ 'Accept' : 'application/json', 'Content-Type': 'application/json' });

    if (1) {

      console.log(JSON.stringify(fiche));

      return this.authHttp.put<BackendMessage>(this.backendUrl + "/users/fiches/" + id + "/" + fiche.book.book_uuid, JSON.stringify(fiche), {headers: headers})
        .pipe(map((message: BackendMessage) => {
          if ((message.errorInd === false) && message.value) {
            this.messageService.sendMessage('success', this.labels[0].success.updated);
            setTimeout(function () {
              this.messageService.clearMessage();
            }.bind(this), 4500);
          }
          return message;
        }
      ));
    }
  }

  //POST 3.
  createFicheDocx(id: string, fiche: Fiche) {

    //this.loaderService.show();

    let headers = new HttpHeaders({ 'Accept' : 'application/json', 'Content-Type': 'application/json' });

    if (1) {

      console.log(JSON.stringify(fiche));

      return this.authHttp.post<BackendMessage>(this.svcDocxUrl + "/users/fiches/", JSON.stringify(fiche), {headers: headers})
        .pipe(map((message: BackendMessage) => {          
          if ((message.errorInd === false) && message.value) {
            this.messageService.sendMessage('success', this.labels[0].success.docx);
            setTimeout(function () {
              this.messageService.clearMessage();
            }.bind(this), 4500);
          }
          return message;
        }
      ));
    }
  }

  //POST 4.
  createFicheXlsx(fiches: Fiche[]) {

    //this.loaderService.show();

    let headers = new HttpHeaders({ 'Accept' : 'application/json', 'Content-Type': 'application/json' });

    if (1) {

      console.log(JSON.stringify(fiches));

      return this.authHttp.post<BackendMessage>(this.svcDocxUrl + "/users/fiches/excel", JSON.stringify(fiches), {headers: headers})
        .pipe(map((message: BackendMessage) => {
          if ((message.errorInd === false) && message.value) {
            this.messageService.sendMessage('success', this.labels[0].success.xlsx);
            setTimeout(function () {
              this.messageService.clearMessage();
            }.bind(this), 4500);
          }
          return message;
        }
      ));
    }
  }

  //POST 5.
  uploadFile(fileToUpload: any) {
    let input = new FormData();
    input.append("file", fileToUpload);

    return this.authHttp.post<BackendMessage>(this.backendUrl + "/users/fiches/uploadfiche", input)
    .pipe(map((message: BackendMessage) => {
        if ((message.errorInd === false) && message.value) {
          this.messageService.sendMessage('success', this.labels[0].success.upload);
          setTimeout(function () {
            this.messageService.clearMessage();
          }.bind(this), 4500);
        }
        return message;
      }
    ));
  }

  // GET 1.
  getStoredFiches(): Observable<Fiche[]> {

    //this.loaderService.show();

    let headers = new HttpHeaders({ 'Accept' : 'application/json', 'Content-Type': 'application/json' });

    return this.authHttp.get<Fiche[]>(this.backendUrl + "/users/fiches/", {headers: headers});
      
  }

  //GET 1. method 2
  getStoredIFiches(): Observable<IFiche[]> {

    return this.authHttp.get<IFiche[]>(this.backendUrl + "/users/fiches/");
      
  }

  // GET 2.
  getStoredFiche(id: string, uuid: string): Observable<Fiche> {

    //this.loaderService.show();

    return this.authHttp.get<Fiche>(this.backendUrl + "/users/fiches/" + id + "/" + uuid);

  }

  // GET 3.
  getFicheDocx(uuid: string) {

    //this.loaderService.show();

    let filename = "fiche_" + uuid + ".docx";

    this.authHttp.get<BackendMessage>(this.svcDocxUrl + "/users/fiches/")
      .subscribe(
      data => {
        if (!data.errorInd) {
          let byteCharacters = atob(data.value);
          let byteNumbers = new Array(byteCharacters.length);
          for (var i = 0; i < byteCharacters.length; i++)
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          let byteArray = new Uint8Array(byteNumbers);
          let file = new Blob([byteArray], { type: 'application/octet-stream' });
          FileSaver.saveAs(file, filename);
        }
      }
    )
  }

  // GET 4.
  getFicheXlsx() {

    //this.loaderService.show();

    let filename = "fichelist.xlsx";

    this.authHttp.get<BackendMessage>(this.svcDocxUrl + "/users/fiches/excel")
      .subscribe(
      data => {
        if (!data.errorInd) {
          let byteCharacters = atob(data.value);
          let byteNumbers = new Array(byteCharacters.length);
          for (var i = 0; i < byteCharacters.length; i++)
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          let byteArray = new Uint8Array(byteNumbers);
          let file = new Blob([byteArray], { type: 'application/octet-stream' });
          FileSaver.saveAs(file, filename);
        }
      }
    )
  }

  // GET 5.
  getFichePNG() {

    this.http.get(this.svcDocxUrl + "/serialnumbers")
      .pipe(map(this.extractData))
      .subscribe(
      data => {
        let byteCharacters = atob(data.barcodeImg);
        let byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++)
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        let byteArray = new Uint8Array(byteNumbers);
        let file = new Blob([byteArray], { type: 'image/png' });
        FileSaver.saveAs(file, 'helloworld.png');
      }
    )
  }

  // GET 6. 
  getStatistics(): Observable<Statistics> {

    let options = new RequestOptions({ headers: this.contentHeaders });

    //this.loaderService.show();

    return this.http.get(this.backendUrl + "/statistics", options )
      .pipe(map(this.extractData));
  }

  //DELETE 1.
  deleteStoredFiche(id: string, uuid: string) {

    //this.loaderService.show();

    this.authHttp.delete<BackendMessage>(this.backendUrl + "/users/fiches/" + id + "/" + uuid)
      .pipe(map((message: BackendMessage) => {
        if ((message.errorInd === false) && message.value) {
          this.messageService.sendMessage('success', this.labels[0].success.deleted);
          setTimeout(function () {
            this.messageService.clearMessage();
          }.bind(this), 4500);
        }
      }
    )).subscribe();

  }

  private extractData(res: Response) {
    let body = res.json();
    console.log("Body: ", body);
    return body;
  }

  getFiche(uuid: string, inputData: any): Fiche {

    var book = {
      title: inputData.title,
      subTitle: inputData.subTitle,
      author: inputData.author,
      yearPub: inputData.yearPub,
      editor: inputData.editor,
      collection: inputData.collection,
      pages: inputData.pages,
      language: inputData.language,
      translation: inputData.translation,
      optional_one: inputData.optional_one,
      author_nationality: inputData.author_nationality,
      author_period: inputData.author_period
    };

    if (uuid != null) {
      book["book_uuid"] = uuid;
    }

    var comments = inputData.comments;

    let ficheInfo: any = { "id": 0, "book": book, "comments": comments };
    let fiche = new Fiche(ficheInfo);

    return fiche;

  }

}
