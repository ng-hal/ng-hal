import { ModuleWithProviders, NgModule } from '@angular/core';

import { CONVERSION_STRATEGY, ConversionStrategy, JsonConversionStrategy } from './conversion';
import { Navigator } from './navigator';
import { Parser } from './parser';


/** Angular module for HAL Navigator. */
@NgModule({})
export class HalModule {


  /** Return a module for HAL Navigator with root providers. */
  public static forRoot(): ModuleWithProviders {

    return {
      ngModule: HalModule,
      providers: [
        { provide: CONVERSION_STRATEGY, useClass: JsonConversionStrategy },
        { provide: Parser, useClass: Parser },
        { provide: Navigator, useClass: Navigator }
      ]
    };
  }

}
