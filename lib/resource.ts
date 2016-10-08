/// <reference path="../typings/halfred.d.ts" />
import { Resource as HalfredResource, LinkCollection, Link, ResourceCollection } from 'halfred';

/** Abstraction of a HAL resource. Based on halfred. */
export class Resource extends HalfredResource {

  private _original: any;

  constructor(
    shallow: any
  ) {
    super(shallow['_links'], shallow['_curies'], shallow['_embedded'], shallow['_validation']);

    this._original = shallow['_original'];
  }

  /** @experimental */
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

}
