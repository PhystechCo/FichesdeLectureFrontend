export class Statistics {

    books : number;
    comments : number;

    constructor(values: Object = {}) {
        this.books = values['books'];
        this.comments = values['comments'];
    }

    
}