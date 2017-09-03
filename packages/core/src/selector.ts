import { Resource, Link } from './hal.interfaces';
import { Uri } from './uri/uri';

// IDEA: a DSL for navigating HAL documents w/ CSS-like selectors

function fromRel<T>(input: T | T[], index: number): T {
  if (input instanceof Array) {
    if (input.length > index) {
      return input[index];
    } else {
      throw new Error(`Index ${index} does not exist in array!`);
    }
  } else if (input) {
    return input;
  }

  throw new Error(`Undefined input given!`);
}

function selectLink(res: Resource, rel: string, index: number = 0): Link {
  const relation = res._links[rel];
  if (!relation) {
    const self = fromRel(res._links.self, 0);
    throw new Error(`Unknown rel ${rel} in resource ${self.href}`);
  }

  return fromRel(relation, index);
}

function expandLink(link: Link, params?: any): string {
  if (link.templated) {
    return Uri.of(link.href).expand(params);
  } else {
    return link.href;
  }
}

export interface SelectByRel<T> {

  rel(name: string, index?: number): T;
}


export interface LinkBuilder extends Link {

  build(params?: any): string;
}


// TODO: good notion?!?
// linksFrom(foo).rel('foo', 2);
export const linksFrom = (res: Resource): SelectByRel<LinkBuilder> => {

  return {
    rel: (rel: string, index: number = 0): LinkBuilder => {
      const link = selectLink(res, rel, index);

      return Object.assign(
        {},
        link,
        {
          build: (params: any): string => expandLink(link, params)
        }
      );

    }
  };
};

linksFrom({}).rel('foo').build({})
linksFrom({}).rel('foo', 4).build({})
linksFrom({}).rel('foo', 4).build()


/*
 Usage:

 linksFrom(list).rel('next');

 linksFrom(list).rel('page', { number: 7 });

 linksFrom(index).rel('collection', { offset: 12, limit: 30, sortBy: 'foo', sortOrder: 'DESC' });

*/


export const embeddedFrom = (res: Resource): SelectByRel<Resource> => {

  return {
    rel: (rel: string, index: number = 0): Resource => {

      return fromRel(res._embedded[rel], index);

      // throw new Error(`No embedded resource ${rel} in ${res._links.self.href}`);
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



/*

from({}).link('foo'); // --> Link + expand()
from({}).embedded('foo'); // --> Resource

from({}).link('foo', 4);
from({}).embedded('foo', 5); // --> Resource
*/

interface ResourceSelects {

  link: (rel: string, index?: number) => LinkBuilder;
  embedded: (rel: string, index?: number) => Resource;
}

export const from = (res: Resource): ResourceSelects => {

  return {
    link: (rel: string, index: number = 0) => linksFrom(res).rel(rel, index),
    embedded: (rel: string, index: number = 0) => embeddedFrom(res).rel(rel, index)
  };
};
