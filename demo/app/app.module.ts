import { NgModule, Provider } from '@angular/core';
import { BrowserModule  }     from '@angular/platform-browser';
import { HttpModule }         from '@angular/http';
import { FormsModule }        from '@angular/forms';
import { AppComponent }       from './app.component';


import { Navigator, ConversionStrategy, ConversionStrategyJson } from '../../dist';
console.log(ConversionStrategy);

const APP_PROVIDERS: any[] = [
  new Provider(ConversionStrategy, { useFactory: () => new ConversionStrategyJson() }),
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
