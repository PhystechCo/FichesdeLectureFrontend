import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MessageService {

  private subject = new Subject<any>();

  constructor() { }

  sendMessage(type: string, message: string) {
    this.subject.next({ type: type, text: message });
  }
  
  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
