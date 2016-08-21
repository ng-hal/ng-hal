import { NgModule, Provider } from '@angular/core';
import { BrowserModule  }     from '@angular/platform-browser';
import { HttpModule }         from '@angular/http';
import { FormsModule }        from '@angular/forms';
import { AppComponent }       from './app.component';


//import { Navigator, ConversionStrategy, ConverterJson } from '../lib';

const APP_PROVIDERS: any[] = [
//  Navigator,
//  new Provider(ConversionStrategy, {
//    useFactory: () => new ConversionStrategy().add(new ConverterJson())
//  })
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
