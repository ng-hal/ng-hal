import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resource } from './hal.interfaces';
import { TRANSPORT } from './hal.di';
import { Transport } from './transport/transport';

@Injectable()
export class Navigator {

  constructor(
    @Inject(TRANSPORT) private transport: Transport
  ) {}

  public get(urlOrResource: string | Resource, options: any): Observable<Resource> {

    return this.transport.get(urlOrResource, options);
    /* Usage (draft)
      navigator.get({ _links: { self: { href: 'foo/bar' } } });
      navigator.get(resourceFrom({}).withSelfHref('foo/bar') );

      then especially helpful for http bodies w/ post/put/patch:
      navigator.post(myResource);

      working w/ urls:
      navigator.get('foo/bar');
      navigator.get('the/only/url/i-need-to-know-for-my-api-index'); // :-)
      navigator.get(linksFrom(resource).rel('next'))

      sophisticated stuff:
      navigator.get('/api')
        .switchMap((index: Resource) => navigator.get( linksFrom(index).rel('next') ))
        .switchMap((res: Resource) => navigator.get( linksFrom(res).rels('page', { limit: 7, page: 2 } ))
        .switchMap((page: Resource) => {
          sideEffectsOn(page); // <-- needs to be discussed ... should we enforce immutability at the hal client level?
          // alternative:
          // page = copyOf(page)._embedded.foo.name = 'I modified it!'

          return navigator.put(page._embedded.foo);
        });
    */
  }

}
