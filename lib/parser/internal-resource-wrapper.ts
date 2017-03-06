import { Resource as HalfredResource } from 'halfred';

import { Resource, Link } from '../hal';

export class InternalResourceWrapper extends HalfredResource implements Resource {

  private _original: any;

  constructor(
    shallow: any
  ) {
    super(shallow['_links'], shallow['_curies'], shallow['_embedded'], shallow['_validation']);

    this._original = shallow['_original'];

    /*
    Object.keys(shallow).forEach((key) => {
      if (key !== '_links' && key !== '_embedded') {
        this[key] = shallow[key];
      }
    });
    // Object.assign(this, shallow);
    */

  }

  allLinksFlattenedArray() {
    let flattenedArray: any[] = Object.keys(this.allLinks())
      .map((key) => {
        return this.linkArray(key)
          .map((link: Link) => {
            let linkWithRel = { rel: key };
            Object.assign(linkWithRel, link);

            return linkWithRel;
          });
      })
      .reduce((a, b) => a.concat(b), []);

    return flattenedArray;
  }

}
