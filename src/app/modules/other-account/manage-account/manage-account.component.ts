import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { ManualLendingService } from '../../../services/investment.service';
import { SharedModule } from '../../shared/shared.module';



@Component({
  selector: 'app-uploadreport',
  standalone: true,
  imports: [SharedModule, CardComponent],
  templateUrl: './manage-account.component.html',
  styleUrl: './manage-account.component.scss'
})
export class ManageAccountComponent {
  errorMessage!: string;
  addToOtherBank: Record<string, unknown> = {};
  addGainTxn: Record<string, unknown> = {};
  resetPrincipal: Record<string, unknown> = {};
  reqSubmited3 = false;
  reqSubmited4 = false;
  reqSubmited5 = false;
  financialYears: string[];

  constructor(private manualLendingService: ManualLendingService) {
    this.financialYears = this.getFutureFinancialYears(3);
  }

  transferAmtToOtherBank() {
    console.log("transferAmtToOtherBank: " + this.addToOtherBank['amount'] + ", " + this.addToOtherBank['depositType']);
    if (this.addToOtherBank['amount']) {
      this.manualLendingService.transferAmtToOtherBank(this.addToOtherBank['amount'] as number, this.addToOtherBank['depositType'] as string, this.addToOtherBank['comment'] as string).subscribe({
        next: data => {
          this.errorMessage = JSON.stringify(data);
          this.reqSubmited3 = true;
        },
        error: e => {
          this.errorMessage = e.error ? e.error.message : 'Something went wrong, status=' + e.status;
          this.reqSubmited3 = true;
        }
      });
    } else {
      this.errorMessage = "Invalid request";
      this.reqSubmited3 = true;
    }
  }
  addUpdateGainTxn() {
    if (this.addGainTxn['particulars']) { 
      console.log('form submit add ' + JSON.stringify(this.addGainTxn));

      this.manualLendingService.addUpdateGainTxn(this.addGainTxn['gainAmount'] as number, this.addGainTxn['particulars'] as string,this.addGainTxn['financialYear'] as string,this.addGainTxn['status'] as string).subscribe({
        next: data => {
          this.errorMessage = JSON.stringify(data);
          this.reqSubmited4 = true;
        },
        error: e => {
          this.errorMessage = e.error ? e.error.message : 'Something went wrong, status=' + e.status;
          this.reqSubmited4 = true;
        }
      });
    } else {
      this.errorMessage = "Invalid request";
      this.reqSubmited4 = true;
    }
  }
  resetCurrentFYPrincipalAmt() {
    this.manualLendingService.resetCurrentFYPrincipalAmt().subscribe({
      next: data => {
        this.errorMessage = JSON.stringify(data);
        this.reqSubmited5 = true;
      },
      error: e => {
        this.errorMessage = e.error ? e.error.message : 'Something went wrong, status=' + e.status;
        this.reqSubmited5 = true;
      }
    });
  }

  getFutureFinancialYears(count = 3): string[] {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    let startYear = month >= 4 ? year : year - 1;
    const financialYears: string[] = [];

    for (let i = 0; i < count; i++) {
      const endYear = startYear + 1;
      financialYears.push(`FY${startYear}_${endYear.toString().slice(-2)}`);
      startYear++;
    }

    return financialYears;
  }
  
}
