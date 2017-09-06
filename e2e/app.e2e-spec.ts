import { SkylinkNgAppPage } from './app.po';

describe('skylink-ng-app App', () => {
  let page: SkylinkNgAppPage;

  beforeEach(() => {
    page = new SkylinkNgAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
