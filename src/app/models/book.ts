export class Book {

    book_uuid : string;
    title: string;
    subTitle: string;
    author: string;
    yearPub: number;
    editor: string;
    collection: string;
    pages: number;
    language: string;
    translation: string;
    optional_one: string;
    author_nationality: string;
    author_period: string;
    
    //isbn: number;
    //optional_two: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    /*
    constructor(title: string,
        subTitle: string,
        author: string,
        yearPub: number,
        editor: string,
        collection: string,
        pages: number,
        language: string) {
    }
    */

}
