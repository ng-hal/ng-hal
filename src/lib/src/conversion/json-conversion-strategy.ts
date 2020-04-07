import { ConversionStrategy }   from './conversion-strategy';
import { Parser }               from '../parser';
import { Resource }             from '../hal';
import { HttpResponse } from '@angular/common/http';


/** A converter for 'application/hal+json' */
export class JsonConversionStrategy implements ConversionStrategy {

  constructor(
    private parser: Parser
  ) {}

  accepts(response: HttpResponse<any>): boolean {
    let mediaType: string = response.headers.get('Content-Type');

    return mediaType === 'application/json' || mediaType === 'application/hal+json';
  }

  convert(response: HttpResponse<any>): Resource {
    let data = response.body;

    return this.parser.parse(data);
  }

}
