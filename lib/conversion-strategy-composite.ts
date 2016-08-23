/// <reference path="../typings/halfred.d.ts" />
import { Response } from '@angular/http';
import { ConversionStrategy } from './conversion-strategy';
import { Resource } from './resource';


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
    // TODO ... this is duplicated from navigator.ts
    let mediaType: string = response.headers.get('Content-Type');

    for (let c of this.conversionStrategies) {
      if (c.accepts(mediaType)) {
        return c.convert(response);
      }
    }

    return null;
  }

}
