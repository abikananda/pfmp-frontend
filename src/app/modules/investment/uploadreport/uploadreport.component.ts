import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { ManualLendingService } from '../../../services/investment.service';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';
import { SharedModule } from '../../shared/shared.module';



@Component({
  selector: 'app-uploadreport',
  standalone: true,
  imports: [SharedModule, CardComponent, FileUploadComponent],
  templateUrl: './uploadreport.component.html',
  styleUrl: './uploadreport.component.scss'
})
export class UploadreportComponent {
  errorMessage!: string;
  form1: Record<string, unknown> = {};
  form2: Record<string, unknown> = {};
  form3: Record<string, unknown> = {};
  form4: Record<string, unknown> = {};
  form5: Record<string, unknown> = {};
  form6: Record<string, unknown> = {};
  reqSubmited1 = false;
  reqSubmited2 = false;
  reqSubmited3 = false;
  reqSubmited4 = false;
  reqSubmited5 = false;
  reqSubmited6 = false;

  constructor(private manualLendingService: ManualLendingService) {

  }
  addAmtToWallet() {
    console.log("addAmtToWallet: " + this.form1['amount1'] + ", " + this.form1['walletType1']);
    if (this.form1['amount1'] && this.form1['walletType1']) {
      this.manualLendingService.addAmtToWallet(this.form1['amount1'] as string, this.form1['walletType1'] as string).subscribe({
        next: data => {
          this.errorMessage = JSON.stringify(data);
          this.reqSubmited1 = true;
        },
        error: e => {
          this.errorMessage = e.error ? e.error.message : 'Something went wrong, status=' + e.status;
          this.reqSubmited1 = true;
        }
      });
    } else {
      this.errorMessage = "Invalid request";
      this.reqSubmited1 = true;
    }
  }
  updateActualWalletBalance() {
    console.log("updateActualWalletBalance: " + this.form2['amount2'] + ", " + this.form2['walletType2']);
    if (this.form2['amount2'] && this.form2['walletType2']) {
      this.manualLendingService.updateActualWalletBalance(this.form2['amount2'] as string, this.form2['walletType2'] as string).subscribe({
        next: data => {
          this.errorMessage = JSON.stringify(data);
          this.reqSubmited2 = true;
        },
        error: e => {
          this.errorMessage = e.error ? e.error.message : 'Something went wrong, status=' + e.status;
          this.reqSubmited2 = true;
        }
      });
    } else {
      this.errorMessage = "Invalid request";
      this.reqSubmited2 = true;
    }
  }
  transferAmtToBank() {
    console.log("transferAmtToBank: " + this.form3['amount3'] + ", " + this.form3['walletType3']);
    if (this.form3['amount3'] && this.form3['walletType3']) {
      this.manualLendingService.transferAmtToBank(this.form3['amount3'] as string, this.form3['walletType3'] as string).subscribe({
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
  addInvestment() {
    if (this.form4['amount4'] && this.form4['walletType4']) {
      console.log('form submit add ' + JSON.stringify(this.form4));
      const addReq = {
        particular: this.form4['particulars'],
        invAmount: this.form4['amount4']
      };
      const addReqJson = JSON.stringify(addReq);

      this.manualLendingService.addInvestment(this.form4['walletType4'] as string, addReqJson).subscribe({
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

  updateInvestment() {
    if (this.form5['amount5'] && this.form5['walletType5']) {
      console.log('form submit update ' + JSON.stringify(this.form5));
      const updateReq = {
        particular: this.form5['particulars2'],
        marketValue: this.form5['amount6'],
        invAmount: this.form5['amount5'],
        otherIncome: this.form5['otherIncome'],
        investmentStatus: this.form5['soldStatus']

      };
      const updateReqJson = JSON.stringify(updateReq);

      this.manualLendingService.updateInvestment(this.form5['walletType5'] as string, updateReqJson).subscribe({
        next: data => {
          this.errorMessage = JSON.stringify(data);
          this.reqSubmited5 = true;
        },
        error: e => {
          this.errorMessage = e.error ? e.error.message : 'Something went wrong, status=' + e.status;
          this.reqSubmited5 = true;
        }
      });
    } else {
      this.errorMessage = "Invalid request";
      this.reqSubmited5 = true;
    }
  }
  updateManualLending() {
    if (this.form6['SchemeId']) {
      console.log('form submit update ' + JSON.stringify(this.form6));
      const updateReq = {
        schemeId: this.form6['SchemeId'],
        dpd: this.form6['DPD'],
        comments: this.form6['Comments']

      };
      
      const updateReqJson = JSON.stringify(updateReq);

      this.manualLendingService.updateManualLending("MANUAL_LENDING", updateReqJson).subscribe({
        next: data => {
          this.errorMessage = JSON.stringify(data);
          this.reqSubmited6 = true;
        },
        error: e => {
          this.errorMessage = e.error ? e.error.message : 'Something went wrong, status=' + e.status;
          this.reqSubmited6 = true;
        }
      });
    } else {
      this.errorMessage = "Invalid request";
      this.reqSubmited6 = true;
    }
  }
}
