import { fromRel } from './util';
import { Link } from '../link';
import { Resource } from '../resource';
import { Uri } from '../uri/uri';

export interface LinkBuilder extends Link {
  build(params?: any): string;
}

export interface LinkSelector {
  rel(name: string, index?: number): LinkBuilder;
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


/**
 * Select links from a resource by relations.
 *
 * Example:
 *
 * ```ts
 * linksFrom({}).rel('foo').href
 * ```
 *
 * @param res Resource object
 */
export const linksFrom = (res: Resource): LinkSelector => {

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
