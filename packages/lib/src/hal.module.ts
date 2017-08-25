import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { CONVERSION_STRATEGY, ConversionStrategy } from './conversion/conversion-strategy';
import { JsonConversionStrategy } from './conversion/json-conversion-strategy';

import { Navigator } from './navigator';
import { Parser } from './parser/parser';


export function jsonConversionProvider(parser: Parser) {
  return new JsonConversionStrategy(parser);
}

const providers: Provider[] = [
  {
    provide: CONVERSION_STRATEGY,
    useFactory: jsonConversionProvider,
    deps: [ Parser ]
  },
  Parser,
  Navigator
];

/** Angular module for HAL Navigator. */
@NgModule({})
export class HalModule {


  /** Return a module for HAL Navigator with root providers. */
  public static forRoot(): ModuleWithProviders {

    return { ngModule: HalModule, providers };
  }

}
