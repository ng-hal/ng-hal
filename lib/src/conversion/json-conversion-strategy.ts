import { Response }             from '@angular/http';

import { ConversionStrategy }   from './conversion-strategy';
import { Parser }               from '../parser';
import { Resource }             from '../hal';


/** A converter for 'application/hal+json' */
export class JsonConversionStrategy implements ConversionStrategy {

  constructor(
    private parser: Parser
  ) {}

  accepts(response: Response): boolean {
    let mediaType: string = response.headers.get('Content-Type');

    return mediaType === 'application/json' || mediaType === 'application/hal+json';
  }

  convert(response: Response): Resource {
    let data = response.json();

    return this.parser.parse(data);
  }

}
