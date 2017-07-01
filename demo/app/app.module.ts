import { NgModule, Provider } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule  } from '@angular/platform-browser';
import { HalModule } from 'ng-hal';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SampleApiModule } from './sample-api/sample-api.module';

@NgModule({
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  imports:      [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    HalModule.forRoot(),
    SampleApiModule.forRoot()
  ]
})
export class AppModule {}
