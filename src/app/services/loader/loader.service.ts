import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LoaderState } from './loader';

@Injectable()
export class LoaderService {

    private loaderSubject = new Subject<LoaderState>();

    loaderState = this.loaderSubject.asObservable();

    constructor() { }

    show() {
        console.log("Showning progress bar")
        this.loaderSubject.next(<LoaderState>{ show: true });
    }

    hide() {
        console.log("Hidding progress bar")
        this.loaderSubject.next(<LoaderState>{ show: false });
    }

}
