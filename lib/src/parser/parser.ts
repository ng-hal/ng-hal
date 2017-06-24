import { Resource } from '../hal/hal.interfaces';
import { ResourceImpl } from '../hal/resource';

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

    // TODO: implement parsing and normalization
    return new ResourceImpl(input);
  }

}
