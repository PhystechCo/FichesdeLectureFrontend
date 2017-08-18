import { FichemgrfrontPage } from './app.po';

describe('fichemgrfront App', () => {
  let page: FichemgrfrontPage;

  beforeEach(() => {
    page = new FichemgrfrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
