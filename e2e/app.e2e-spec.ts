import { NgcraftPage } from './app.po';

describe('ngcraft App', function() {
  let page: NgcraftPage;

  beforeEach(() => {
    page = new NgcraftPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
