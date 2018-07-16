export class Comment {

    author : string;
    aboutAuthor : string;
    aboutGenre : string;
    aboutCadre : string;
    aboutCharacters : string;
    resume : string;
    extrait : string;
    appreciation : string;
    isCompleted : boolean;
    submission_date : string;
    //completion_date : string;
    comment_text: string;
    other_details: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}
