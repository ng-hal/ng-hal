import { NgModule } from '@angular/core';

import { ConversionStrategy } from './conversion-strategy';
import { ConversionStrategyJson } from './conversion-strategy-json';
import { Navigator } from './navigator';

@NgModule({
  providers: [
    { provide: ConversionStrategy, useClass: ConversionStrategyJson },
    Navigator
  ]
})
export class HalModule {
}
