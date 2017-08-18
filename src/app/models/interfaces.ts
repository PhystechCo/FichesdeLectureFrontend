/*
    Interface only for Fiches
*/

export interface IFiche {

    id: number;
    book: IBook;

}

export interface IBook {

    title: string;
    subTitle: string;
    author: string;
    yearPub: number;
    editor: string;
    collection: string;
    pages: number;
    language: string;

}