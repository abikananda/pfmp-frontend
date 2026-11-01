import { NgModule } from '@angular/core';

import { FixedInvestmentRoutingModule } from './fixed-investment-routing.module';
import { SharedModule } from '../shared/shared.module';
import { registerLocaleData } from '@angular/common';
import localeHi from '@angular/common/locales/hi';

registerLocaleData(localeHi);


@NgModule({
  declarations: [],
  imports: [
    FixedInvestmentRoutingModule,
    SharedModule
  ]
})
export class FixedInvestmentModule { }
