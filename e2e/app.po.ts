import { browser, element, by } from 'protractor';

export class DemoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ngh-root h1')).getText();
  }
}
