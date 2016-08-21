import { Response } from '@angular/http';
import { ConversionStrategy } from './conversion-strategy';
import { Resource } from 'halfred';


export class ConversionStrategyComposite implements ConversionStrategy {

  constructor(
    private conversionStrategies: ConversionStrategy[]
  ) {}

  accepts(mediaType: string): boolean {
    for (let c of this.conversionStrategies) {
      if (c.accepts(mediaType)) {
        return true;
      }
    }

    return false;
  }

  convert(response: Response): Resource {
    let mediaType: string = response.headers.get('Content-Type'); // TODO ... this is duplicated from navigator.ts

    for (let c of this.conversionStrategies) {
      if (c.accepts(mediaType)) {
        return c.convert(response);
      }
    }

    return null;
  }

}
