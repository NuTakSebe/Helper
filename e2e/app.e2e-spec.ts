import { LKPlusPage } from './app.po';

describe('lkplus App', () => {
  let page: LKPlusPage;

  beforeEach(() => {
    page = new LKPlusPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
