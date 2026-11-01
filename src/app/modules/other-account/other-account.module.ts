import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { OtherAccountRoutingModule } from './other-account-routing.module';
import { registerLocaleData } from '@angular/common';
import localeHi from '@angular/common/locales/hi';

registerLocaleData(localeHi);

@NgModule({
  declarations: [],
  imports: [
    OtherAccountRoutingModule,
    SharedModule
  ]
})
export class OtherAccountModule { }
