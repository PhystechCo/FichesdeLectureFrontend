import { Book } from './book';
import { Comment } from './comment';

export class Fiche {

    fiche_uuid : string;
    id: number;
    book: Book;
    comments : Comment[];

    constructor(values: Object = {}) {
        console.log("Constructor for book: ", values['book']);
        this.fiche_uuid = values['fiche_uuid'];
        this.id = values['id'];
        this.book = new Book(values['book']);
        this.comments = values['comments'];
    }

    
}
