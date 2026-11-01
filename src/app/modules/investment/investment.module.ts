import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { InvestmentRoutingModule } from './investment-routing.module';
import { registerLocaleData } from '@angular/common';
import localeHi from '@angular/common/locales/hi';

registerLocaleData(localeHi);


@NgModule({
  declarations: [],
  imports: [
    InvestmentRoutingModule,
    SharedModule
  ]
})
export class InvestmentModule { }
