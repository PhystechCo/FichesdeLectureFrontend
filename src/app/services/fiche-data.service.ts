import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, Response, Headers, ResponseContentType } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import * as FileSaver from 'file-saver';

import { LoaderService } from './loader/loader.service';
import { MessageService } from '../services/message.service';
import { Fiche } from "../models/fiche";
import { Book } from "../models/book";
import { IFiche } from "../models/interfaces";
import { Statistics } from '../models/statistics';

import { Config } from '../app.config';
import { LocaleService } from './locale.service';

@Injectable()
export class FicheDataService {

  private backendUrl;
  private svcDocxUrl;

  public labels : any;

  contentHeaders = new Headers();

  constructor(private http: Http,
    public authHttp: AuthHttp,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private config : Config,
    private locale : LocaleService) {

    this.contentHeaders.append('Accept', 'application/json');
    this.contentHeaders.append('Content-Type', 'application/json');

    this.backendUrl = this.config.get("backendUrl");
    this.svcDocxUrl = this.config.get("svcDocxUrl");

    this.labels = locale.get("messages");
    console.log(this.labels);

  }

  //POST 1.
  createFiche(fiche : Fiche) {

    this.loaderService.show();

    let options = new RequestOptions({ headers: this.contentHeaders });

    if (1) {
      
      console.log(JSON.stringify(fiche));

      this.authHttp.post(this.backendUrl + "/users/fiches/", JSON.stringify(fiche), options)
        .map((res: Response) => {
          let message = res.json();
          if ((message.errorInd === false) && message.value) {
            this.messageService.sendMessage('success', this.labels[0].success.added);
            setTimeout(function () {
              this.messageService.clearMessage();
            }.bind(this), 4500);
          }
        })
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
        .finally(() => {
        this.loaderService.hide()})
        .subscribe();
    }
  }

  //POST 2.
  updateFiche(id: string, fiche : Fiche ) {

    this.loaderService.show();

    let options = new RequestOptions({ headers: this.contentHeaders });

    if (1) {
      
      console.log(JSON.stringify(fiche));

      return this.authHttp.put(this.backendUrl + "/users/fiches/" + id + "/" + fiche.book.book_uuid, JSON.stringify(fiche), options)
        .map((res: Response) => {
          let message = res.json();
          if ((message.errorInd === false) && message.value) {
            this.messageService.sendMessage('success', this.labels[0].success.updated);
            setTimeout(function () {
              this.messageService.clearMessage();
            }.bind(this), 4500);
          }
          return message;
        })
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')).finally(() => {
        this.loaderService.hide()});
    }
  }

  //POST 3.
  createFicheDocx(id: string, fiche : Fiche ) {

    this.loaderService.show();

    let options = new RequestOptions({ headers: this.contentHeaders });

    if (1) {

      console.log(JSON.stringify(fiche));
      
      return this.authHttp.post(this.svcDocxUrl + "/users/fiches/", JSON.stringify(fiche), options)
        .map((res: Response) => {
          let message = res.json();
          if ((message.errorInd === false) && message.value) {
            this.messageService.sendMessage('success', this.labels[0].success.docx);
            setTimeout(function () {
              this.messageService.clearMessage();
            }.bind(this), 4500);
          }
          return message;
        })
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')).finally(() => {
        this.loaderService.hide()});
    }
  }

  // GET 1.
  getStoredFiches(): Observable<Fiche[]> {

    this.loaderService.show();

    let options = new RequestOptions({ headers: this.contentHeaders });

    return this.authHttp.get(this.backendUrl + "/users/fiches/", options)
      .map(this.extractData)
      .catch(this.handleError).finally(() => {
        this.loaderService.hide();
      });
  }

  //GET 1. method 2
  getStoredIFiches(): Observable<IFiche[]> {

    return this.authHttp.get(this.backendUrl + "/users/fiches/")
      .map(response => response.json() as IFiche[])
      .catch(this.handleError).finally(() => {
        this.loaderService.hide()});
  }

  // GET 2.
  getStoredFiche(id: string, uuid: string): Observable<Fiche> {
    
    this.loaderService.show();

    return this.authHttp.get(this.backendUrl + "/users/fiches/" + id + "/" + uuid)
      .map(this.extractData)
      .catch(this.handleError).finally(() => {
        this.loaderService.hide()});
  }

  // GET 3.
  getFicheDocx(uuid: string) {

    this.loaderService.show();

    let filename = "fiche_" + uuid + ".docx";
    
    this.authHttp.get(this.svcDocxUrl + "/users/fiches/")
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => {
        this.loaderService.hide()})
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
      })

  }

  // GET 4.
  getFichePNG() {

    this.http.get(this.svcDocxUrl + "/serialnumbers")
      .map(this.extractData)
      .catch(this.handleError).subscribe(
      data => {
        let byteCharacters = atob(data.barcodeImg);
        let byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++)
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        let byteArray = new Uint8Array(byteNumbers);
        let file = new Blob([byteArray], { type: 'image/png' });
        FileSaver.saveAs(file, 'helloworld.png');
      })

  }

  // GET 5. 
  getStatistics() : Observable<Statistics>{
    
    let options = new RequestOptions({ headers: this.contentHeaders });

    this.loaderService.show();

    return this.http.get(this.backendUrl + "/statistics", options)
      .map(this.extractData)
      .catch(this.handleError).finally(() => {
        this.loaderService.hide()});
  }

  // DELETE 1.
  deleteStoredFiche(id: string, uuid: string) {

    this.loaderService.show();

    this.authHttp.delete(this.backendUrl + "/users/fiches/" + id + "/" + uuid)
      .map((res: Response) => {
        let message = res.json();
        if ((message.errorInd === false) && message.value) {
          this.messageService.sendMessage('success', this.labels[0].success.deleted);
          setTimeout(function () {
            this.messageService.clearMessage();
          }.bind(this), 4500);
        }
      })
      .catch(this.handleError).finally(() => {
        this.loaderService.hide()})
      .subscribe();

  }

  private extractData(res: Response) {
    let body = res.json();
    console.log("Body: ", body);
    return body;
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error("handleError:", errMsg);
    return Observable.throw(errMsg);
  }

  getFiche( uuid: string, inputData : any ) : Fiche {
    
        var book = { 
          title: inputData.title,
          subTitle : inputData.subTitle,
          author:  inputData.author,
          yearPub:  inputData.yearPub,
          editor:  inputData.editor,
          collection:  inputData.collection,
          pages:  inputData.pages,
          language:  inputData.language 
        };
    
        if ( uuid != null ) {
          book["book_uuid"] = uuid;
        }

        var comments = inputData.comments;
    
        let ficheInfo: any = { "id": 0, "book": book, "comments": comments };
        let fiche = new Fiche(ficheInfo);
    
        return fiche;
    
      }

}
