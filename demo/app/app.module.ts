import { NgModule, Provider } from '@angular/core';
import { BrowserModule  }     from '@angular/platform-browser';
import { HttpModule }         from '@angular/http';
import { FormsModule }        from '@angular/forms';
import { AppComponent }       from './app.component';

import { Navigator, ConversionStrategy, ConversionStrategyJson } from '../../dist';

const APP_PROVIDERS: Provider[] = [
  { provide: ConversionStrategy, useClass: ConversionStrategyJson },
  Navigator
];

@NgModule({
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  imports:      [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers:    [ APP_PROVIDERS ]
})
export class AppModule {}
