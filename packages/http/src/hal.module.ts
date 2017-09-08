import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CONVERSION, ConversionStrategy } from './conversion/conversion';
import { TRANSPORT, Transport } from './transport/transport';
import { HttpClientTransport } from './transport/http-client-transport';
import { HalInterceptor } from './transport/hal-interceptor';

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
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HalInterceptor,
    multi: true
  }
];

@NgModule({})
export class HalModule {


  public static forRoot(): ModuleWithProviders {

    return { ngModule: HalModule, providers };
  }
}
