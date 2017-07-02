import { Resource } from '../model/hal.interfaces';
import { ResourceImpl } from '../model/resource';
import { deepCopy } from './util';

/**
 * Parser implements validation and normalization of HAL resources represented as object literals.
 *
 * <p>It performs normalization and validation of the reserved HAL properties
 * <code>_embedded</code> and <code>_links</code>.
 */
export class Parser {

  public parse(input: any): Resource {

    // deep copy for the lazy developer :-)
    const copy =  JSON.parse(JSON.stringify(input));

    copy['_links'] = copy['_links'] || {};
    Object.keys(copy['_links'])
      .forEach((key) => {
        if (!(copy['_links'][key] instanceof Array)) {
          copy['_links'][key] = [ copy['_links'][key] ];
        }
      });
    copy['_embedded'] = copy['_embedded'] || {};
    Object.keys(copy['_embedded'])
      .forEach((key) => {
        if (!(copy['_embedded'][key] instanceof Array)) {
          copy['_embedded'][key] = [ copy['_embedded'][key] ];
        }
      });

    // normalize(copy)
    //  |-> normalizeLinks(copy._links)
    //  |-> normalizeEmbedded(copy._embedded)
    //  |-> for each (rel in embedded): normalize(embedded[rel])

    // TODO: implement parsing and normalization
    return new ResourceImpl(copy, input);
  }

}
