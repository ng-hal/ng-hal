import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CONVERSION, ConversionStrategy } from './conversion/conversion';
import { TRANSPORT, Transport } from './transport/transport';
import { HttpClientTransport } from './transport/http-client-transport';

export const providers = [
  Navigator,
  {
    provide: TRANSPORT,
    useClass: HttpClientTransport
  },
  {
    provide: CONVERSION,
    useValue: {
      foo: () => { console.log('bar'); }
    }
  }
];

@NgModule({})
export class HalModule {


  public static forRoot(): ModuleWithProviders {

    return { ngModule: HalModule, providers };
  }
}
