import { Component, ViewEncapsulation } from '@angular/core';
import { Request, Response } from '@angular/http';

import {
  Navigator, HalDocument, ConversionStrategy, Resource, Link, LinkWithRel
} from '../../dist';


/** Demo application */
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {

  model: any = {
    verb: 'GET',
    url: 'hal/orders.json'
  };
  activeTab: string = 'hal';

  resource: Resource;
  response: Response;
  request: Request;
  links: LinkWithRel[] = [];

  constructor(
    private navigator: Navigator
  ) {}

  ngOnInit() {
    console.log("AppComponent inited.", this.navigator);

    /*
    this.navigator
      .get('/hal/orders.json')
      .mergeMap((hal: HalDocument) => { // XX .. follow
        console.log("mergeMap");
        return this.navigator.get('/hal/orders_523.json')
      })
      .mergeMap((hal: HalDocument) => { // XX .. follow
        console.log("mergeMap");
        return this.navigator.get('/hal/links_self.json')
      })
      .subscribe((hal: HalDocument) => { // XX .. follow
        console.log(hal);
        console.log("finished");
      })
    */
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
          this.links = this.resource.allLinksFlattenedArray();
        }
      )
  }

  onSwitchTab(name: string) {
    this.activeTab = name;

    return false;
  }

  onNavigate(link: Link) {
    this.model['url'] = link.href;

    return false;
  }

}
