import {Book} from './book';

describe('Book', () => {
  it('should create an instance', () => {
    expect(new Book()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let book = new Book({
      title: 'Hacking',
      subTitle: 'The art of exploitation',
      author : 'Jon Erickson',
      yearPub : 2003,
      editor : 'No Starch Press',
      collection : 'hacking',
      pages : 240,
      language : 'english'
    });
    expect(book.title).toEqual('Hacking');
    expect(book.yearPub).toEqual(2003);
  });

});
