import { NgModule, Provider } from '@angular/core';
import { HttpModule }         from '@angular/http';
import { BrowserModule  }     from '@angular/platform-browser';
import { FormsModule }        from '@angular/forms';
import { HalModule }          from '../../dist';
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