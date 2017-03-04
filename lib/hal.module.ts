import { ModuleWithProviders, NgModule } from '@angular/core';

import { CONVERSION_STRATEGY, ConversionStrategy, JsonConversionStrategy } from './conversion';
import { Navigator } from './navigator';


/** Angular module for HAL Navigator. */
@NgModule({
})
export class HalModule {


  /** Return a module for HAL Navigator with root providers. */
  public static forRoot(): ModuleWithProviders {

    return {
      ngModule: HalModule,
      providers: [
        { provide: ConversionStrategy, useClass: ConversionStrategyJson },
        { provide: Navigator, useClass: Navigator }
      ]
    };
  }

}
