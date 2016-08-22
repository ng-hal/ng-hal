import { Component, ViewEncapsulation } from '@angular/core';
import { Request, Response } from '@angular/http';

import { Navigator, HalDocument, ConversionStrategy, Resource, Link } from '../../dist';

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
  links: {rel: string, link: Link}[] = [];

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

          this.links = [];
          let allLinks = this.resource.allLinks();
          for (let key in allLinks) {
            let links = this.resource.linkArray(key);

            for (let link of links) {
              this.links.push({rel: key, link});
            }
          }
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
