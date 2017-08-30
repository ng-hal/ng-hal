import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resource } from './hal.interfaces';

@Injectable()
export class Navigator {

  constructor(
    private http: HttpClient // <-- implementation detail: do we actually sit on top of HttpClient?
                             // If yes, we should kind of "decorate" requests (w/ Accept / Content-Type)
                             // How do we go w/ the overloaded methods and `responseType` (which we need to know in advance)?
                             // Can we go w/ HttpHandler?
                             //   |-> if yes, maybe we build HttpRequest directly and set up serialization around it...
                             // Can we go w/ HttpInterceptors for modifying requests?
                             //   |--> if yes, maybe interceptors should do the serialization / deserialization
  ) {}

  public get(urlOrResource: string | Resource, options: any): Observable<Resource> {
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
