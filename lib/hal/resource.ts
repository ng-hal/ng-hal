import { Link } from './link';
import { LinkCollection } from './link-collection';
import { ResourceCollection } from './resource-collection';


/** @see https://github.com/basti1302/halfred#resource-api */
export class Resource {

  constructor(links: any, curies: any, embedded: any, validationIssues: any) {}

  /**
   * Returns an object which has an array for each link that was present in the source object.
   * See below why each link is represented as an array.
   */
  allLinkArrays(): LinkCollection {
    // TODO
    return;
  }

  /** Alias for allLinkArrays() */
  allLinks(): LinkCollection {
    // TODO
    return;
  }

  /**
   * Returns the array of links for the given key, or null if there are no links for this key.
   */
  linkArray(key: string): Link[] {
    // TODO
    return;
  }

  /**
   * Returns the first element of the array of links for the given key or null if there are no
   * links for this key.
   */
  link(key: string): Link {
    // TODO
    return;
  }

  /**
   * Returns an object which has an array for each embedded resource that was present in the
   * source object.
   * See below why each embedded resource is represented as an array. Each element of any of
   * this arrays is in turn a Resource object.
   */
  allEmbeddedResourceArrays(): ResourceCollection {
    // TODO
    return;
  }

  /** Alias for allEmbeddedResourceArrays() */
  allEmbeddedArrays(): ResourceCollection {
    // TODO
    return;
  }

  /** Alias for allEmbeddedResourceArrays() */
  allEmbeddedResources(): ResourceCollection {
    // TODO
    return;
  }

  /**
   * Returns the array of embedded resources for the given key, or null if there are no embedded
   * resources for this key. Each element of this arrays is in turn a Resource object.
   */
  embeddedResourceArray(key: string): Resource[] {
    // TODO
    return;
  }

  /** Alias for embeddedResourceArray() */
  embeddedArray(key: string): Resource[] {
    // TODO
    return;
  }

  /**
   * Returns the first element of the array of embedded resources for the given key or null if
   * there are no embedded resources for this key. The returend object is a Resource object.
   */
  embeddedResource(key: string): Resource {
    // TODO
    return;
  }

  /** Alias for embeddedResource(key) */
  embedded(key: string): Resource {
    // TODO
    return;
  }

  /**
   * Returns the unmodified, original object that was parsed to this resource. This is rather
   * uninteresting for the source object you give to the parse method (because you probably
   * still have a reference to the source object) but it is a convenient way to get the part of
   * the source object that corresponds to an embedded resource.
   */
  original(): any {
    // TODO
    return;
  }

  /**
   * Returns true if the resource has any CURIEs (Compact URIs).
   *
   * @see http://www.w3.org/TR/2010/NOTE-curie-20101216/
   */
  hasCuries(): boolean {
    // TODO
    return;
  }

  /**
   * Returns the array of CURIEs. Each object in the array is a link object, which means it
   * can be templated etc. See below for the link object API.
   */
  curieArray(): Link[] {
    // TODO
    return;
  }

  /**
   * Returns the curie with the given name, if any. The returned object is a link object, which
   * means it can be templated etc. See below for link object API.
   */
  curie(name: string): Link {
    // TODO
    return;
  }

  /**
   * Returns the compact URI for the given full URL, if any
   */
  reverseResolveCurie(fullUrl: string): string {
    // TODO
    return;
  }


  /** @experimental
  allLinksFlattenedArray(): Link[] {
    let flattenedArray: any[] = Object.keys(this.allLinks())
      .map((key) => {
        return this.linkArray(key)
          .map((link: Link) => {
            let linkWithRel = { rel: key };
            Object.assign(linkWithRel, link);

            return linkWithRel;
          })
      })
      .reduce((a, b) => a.concat(b), [])

    return flattenedArray;
  }
  */

}
