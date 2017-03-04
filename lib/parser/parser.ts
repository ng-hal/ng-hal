/// <reference path="../typings/halfred.d.ts" />
import { Resource as HalfredResource, parse as halfredParse } from 'halfred';

import { Resource } from '../hal';

/** Abstraction of a HAL resource. Based on halfred. */
class InternalResourceWrapper extends HalfredResource {

  private _original: any;

  constructor(
    shallow: any
  ) {
    super(shallow['_links'], shallow['_curies'], shallow['_embedded'], shallow['_validation']);

    this._original = shallow['_original'];
  }

}

/**
 * Parser offers validation and normalization of HAL resources represented as object literals.
 *
 * <p>It p
 *
 * <p>Internally, delegates to <code>halfred</code> library for the time being.
 */
export class Parser {

  public parse(input: any): Resource {
    return new InternalResourceWrapper(halfredParse(input));
  }

}
