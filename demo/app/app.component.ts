import { Component, ViewEncapsulation } from '@angular/core';
import { Request, Response } from '@angular/http';

import { Navigator, HalDocument, ConversionStrategy, Resource } from '../../dist';

/** Demo application */
@Component({
  selector: 'app',
  templateUrl: './app.component.html' 
})
export class AppComponent {

  model: any = {
    verb: 'GET',
    url: '/hal/orders.json'
  };
  activeTab: string = 'hal';

  resource: Resource;
  response: Response;
  request: Request;

  constructor(
    private navigator: Navigator
  ) {}

  ngOnInit() {
    console.log("AppComponent inited.", this.navigator);
  }

  onFormSubmit() {
    console.log("form model:", this.model);

    this.navigator
      .get(this.model.url)
      .subscribe(
        (doc: HalDocument) => {
          this.resource = doc.resource;
          this.response = doc.response;
          this.request = doc.request;
        }
      )
  }

  onSwitchTab(name: string) {
    this.activeTab = name;

    return false;
  }

}
