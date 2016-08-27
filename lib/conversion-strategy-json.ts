import { Injectable }           from '@angular/core';
import { Response }             from '@angular/http';

import { parse }                from 'halfred';

import { ConversionStrategy }   from './conversion-strategy';
import { Resource }             from './resource';


/** A converter for 'application/hal+json' */
@Injectable()
export class ConversionStrategyJson implements ConversionStrategy {

  constructor() {}

  accepts(response: Response): boolean {
    let mediaType: string = response.headers.get('Content-Type');

    return mediaType === 'application/json' || mediaType === 'application/hal+json';
  }

  convert(response: Response): Resource {
    let data = response.json();

    return new Resource(parse(data));
  }

}
