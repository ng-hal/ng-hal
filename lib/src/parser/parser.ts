import { Resource as HalfredResource, parse as halfredParse } from 'halfred';

import { Resource } from '../hal';

import { InternalResourceWrapper } from './internal-resource-wrapper';

/**
 * Parser offers validation and normalization of HAL resources represented as object literals.
 *
 * <p>It performs normalization and validation of the reserved HAL properties
 * <code>_embedded</code> and <code>_links</code>.
 *
 * <p>Internally, delegates to <code>halfred</code> library for the time being.
 */
export class Parser {

  public parse(input: any): Resource {
    return new InternalResourceWrapper(halfredParse(input) || {});
  }

}
