import { Response } from '@angular/http';
import { ConversionStrategy } from './conversion-strategy';
import { Parser } from '../parser/parser';
import { Resource } from '../model/hal.interfaces';

/** A converter for 'application/hal+json' */
export class JsonConversionStrategy implements ConversionStrategy {

  constructor(
    private parser: Parser
  ) {}

  accepts(response: Response): boolean {
    const mediaType: string = response.headers.get('Content-Type');

    switch (mediaType) {
      case 'application/json':
      case 'application/hal+json':
        return true;
      default:
        return false;
    }

  }

  convert(response: Response): Resource {
    return this.parser.parse(response.json());
  }

}
