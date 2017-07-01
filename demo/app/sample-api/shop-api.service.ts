import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { Document, Navigator, NormalizedResourceDocument, Resource } from 'ng-hal';

export interface Orders extends NormalizedResourceDocument {
  currentlyProcessing: number,
  shippedToday: number,
}

@Injectable()
export class ShopApiService {

  constructor(
    private navigator: Navigator
  ) {}


  public walkThrough() {

    return this.navigator.get('/api/orders.json')
      .follow((doc: Document) => {
        const orders: Resource[] = doc.resource.embeddedArray('ea:order');
        const urls: string[] = orders.map((order) => order.link('self').href);
        const observables = urls.map((url) => this.navigator.get(url));

        return Observable.combineLatest(observables);
      });

  }

}
