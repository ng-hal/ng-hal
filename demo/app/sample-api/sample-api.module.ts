import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopApiService } from './shop-api.service';
import { ShopComponent } from './shop/shop.component';

const providers: Provider[] = [ ShopApiService ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ShopComponent
  ],
  exports: [
    ShopComponent
  ]
})
export class SampleApiModule {

  public static forRoot(): ModuleWithProviders {

    return { ngModule: SampleApiModule, providers };
  }
}
