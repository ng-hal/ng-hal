// IDEA: a DSL for navigating HAL documents w/ CSS-like selectors


export const linksFrom = (res: Resource) => {

  return {
    rel: (name: string, params?: any): string => {
      const link = res && res._links ? res._links[rel] : undefined;
      
      if (link && link.templated) {
        return expand(link.href, params);
      } else if (link) {
        return link.href;
      }

      throw new Error(`Unknown relation ${rel} in resource ${res._links.self.href}`);
    },
    rels: (name: string, index: number, params?: any): string => {
      // TODO: good notion?!?
      // linksFrom(foo).rels('foo', 2, {});
    }
  };
};

/*
 Usage:

 linksFrom(list).rel('next');

 linksFrom(list).rel('page', { number: 7 });

 linksFrom(index).rel('collection', { offset: 12, limit: 30, sortBy: 'foo', sortOrder: 'DESC' });

*/


export const embeddedFrom = (res: Resource) => {
  
  return {
    rel: (rel: string): Resource => {
      const embeddedResource = res && res._embedded ? res._embedded[rel] : undefined;

      if (embeddedResource) {
        return embeddedResource;
      }

      throw new Error(`No embedded resource ${rel} in ${res._links.self.href}`);
    },
    rels: (rel: string, index: number): Resource => {
      // embeddedFrom(foo).rels('foo', 3);
    }
  };
};

/* Usage:
 
 embeddedFrom(foo).rel('list');
 embeddedFrom(slice).rel('collection');
 embeddedFrom(foobar).rel('page');
 embeddedFrom(think).rel('form');
 embeddedFrom(cart).rels('item', 2);
 embeddedFrom(customer).rels('orders', 7);
 */


// TODO: builders for resources would also be cool :-)
// https://github.com/dherges/ng-hal/issues/6#issuecomment-325466599
/*
this.http.post(linksFrom(foo).rel('bar'), resourceFrom({}).withSelfHref('foo/bar') )

const foo = { _links: { self: { href: 'foo/bar' } } };
resourceFrom({}).withSelfRel(foo));

resourceFrom({}).withRel('next', 'foo/bar'));
resourceFrom({}).withRel('next', { href: 'foo/{bar}', templated: true } ));
*/
