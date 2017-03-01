import { RomanPage } from './app.po';

describe('roman App', function() {
  let page: RomanPage;

  beforeEach(() => {
    page = new RomanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
