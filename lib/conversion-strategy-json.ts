import { Injectable }   from '@angular/core';
import { Response }     from '@angular/http';

import { parse } from 'halfred';

import { ConversionStrategy } from './conversion-strategy';
import { HalDocument }        from './hal-document';
import { Resource }           from './resource';


/** A converter for 'application/hal+json' */
@Injectable()
export class ConversionStrategyJson implements ConversionStrategy {

  constructor() {}

  accepts(mediaType: string): boolean {
    return mediaType === 'application/json' || mediaType === 'application/hal+json';
  }

  convert(response: Response): Resource {
    let data = response.json();

    return new Resource(parse(data));
  }
}
