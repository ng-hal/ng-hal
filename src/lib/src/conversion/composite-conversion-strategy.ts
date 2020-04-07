import { ConversionStrategy }   from './conversion-strategy';
import { Resource }             from '../hal';
import { HttpResponse } from '@angular/common/http';


export class CompositeConversionStrategy implements ConversionStrategy {

  constructor(
    private conversionStrategies: ConversionStrategy[]
  ) {}

  accepts(response: HttpResponse<any>): boolean {
    let c: ConversionStrategy = this.findFirst(response);

    return c ? true : false;
  }

  convert(response: HttpResponse<any>): Resource {
    let c: ConversionStrategy = this.findFirst(response);

    if (c) {
      return c.convert(response);
    }

    return;
  }

  private findFirst(response: HttpResponse<any>): ConversionStrategy {
    for (let c of this.conversionStrategies) {
      if (c.accepts(response)) {
        return c;
      }
    }
  }

}
