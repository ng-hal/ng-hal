/// <reference path="../ng-hal/typings/halfred.d.ts" />

import { NgModule, Provider } from '@angular/core';
import { HttpModule }         from '@angular/http';
import { BrowserModule  }     from '@angular/platform-browser';
import { FormsModule }        from '@angular/forms';

import { HalModule }          from 'ng-hal';

import { AppComponent }       from './app.component';


@NgModule({
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    HalModule.forRoot()
  ]
})
export class AppModule {}
