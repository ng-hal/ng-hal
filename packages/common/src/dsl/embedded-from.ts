import { Resource } from '../resource';
import { fromRel } from './util';

export interface ResourceSelector {
  rel(name: string, index?: number): Resource;
}


/**
 * Select embedded resources from a resource by relations.
 *
 * Example:
 *
 * ```ts
 * embeddedFrom({}).rel('foo')
 * ```
 *
 * @param res Resource object
 */
export const embeddedFrom = (res: Resource): ResourceSelector => {

  return {
    rel: (rel: string, index: number = 0): Resource => {

      return fromRel(res._embedded[rel], index);

      // throw new Error(`No embedded resource ${rel} in ${res._links.self.href}`);
    }
  };
};
