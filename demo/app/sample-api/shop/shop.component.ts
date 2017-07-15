import { Component, OnInit } from '@angular/core';
import { Response, Request } from '@angular/http';
import 'rxjs/add/operator/mergeMap';
import {
  Navigator,
  Transaction,
  Resource,
  Session,
  LinkDefinition,
  Link
} from 'ng-hal';
import { ShopApiService } from '../shop-api.service';

@Component({
  selector: 'ngh-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {

  model: any = {
    verb: 'GET',
    url: 'api/orders.json',
    params: [],
    link: undefined
  };
  activeTab: string = 'hal';

  resource: Resource;
  response: Response;
  request: Request;
  links: LinkDefinition[] = [];


  constructor(
    private navigator: Navigator,
    private shopApi: ShopApiService
  ) {}

  ngOnInit() {

    this.shopApi.walkThrough().subscribe((res) => console.warn(res));

    this.navigator
      .get('/api/orders.json')
      .mergeMap(() => this.navigator.get('api/orders/123.json'))
      .subscribe((nav) => console.log(nav));

  }

  onFormSubmit() {
    console.log("form model:", this.model);
    let params = this.model.params
      .map((p: any) => { let p2: any = {}; p2[p.key] = p.value; return p2; })
      .reduce((prev: any, next: any) => Object.assign(prev, next), {})

    let url = this.model.url;

    this.navigator
      .get(url)
      .subscribe(
        (doc: Transaction) => {
          this.resource = doc.resource;
          this.response = doc.response;
          this.request = doc.request;
          this.links = []; //this.resource.allLinksFlattenedArray();
        }
      );
  }

  onSwitchTab(name: string) {
    this.activeTab = name;

    return false;
  }

  onNavigate(link: LinkDefinition) {
    this.model.link = link;
    this.model['url'] = link.href;
    this.model['params'] = link.templated ? [{}] : [];

    return false;
  }

}
