import { Component } from '@angular/core';
import { ManualLendingService } from '../../../services/investment.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { SharedModule } from '../../shared/shared.module';
import { InvDataTableComponent } from '../../shared/components/inv-data-table/inv-data-table.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

export class DashData {
  realisedReturnAmt: number;
  realisedReturnPer: number;
  totalFundInvested: number;
  totalFundInWallet: number;
  amountLoadedToWallet: number;
  balanceAmountInBank: number;
  actualAmountInWallet: number;
  charges: number;
  totalNumberOfLoans: number;
  numberOfActiveLoans: number;
  constructor() {
    this.realisedReturnAmt = 0;
    this.realisedReturnPer = 0;
    this.totalFundInvested = 0;
    this.totalFundInWallet = 0;
    this.amountLoadedToWallet = 0;
    this.balanceAmountInBank = 0;
    this.actualAmountInWallet = 0;
    this.charges = 0;
    this.totalNumberOfLoans = 0;
    this.numberOfActiveLoans = 0;
  }
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent,NgxChartsModule, SharedModule, InvDataTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  invOptions = [
    { value: 'MANUAL_LENDING', text: 'MANUAL_LENDING' },
    { value: 'MOM_DHAN_ACCOUNT', text: 'STOCKS' }
  ];
  selectedInvType = this.invOptions[0].value;

  data = new DashData();
  errorMessage!: string;
  showMonthly=true;
  
  monthlyLoanSummary: any[] = [];
  loanSummary: any[] = [];
  monthlyInvestmentSummary: any[] = [];
  investmentSummary: any[] = [];

  constructor(private manualLendingService: ManualLendingService, private spinner: NgxSpinnerService) {
    this.getInvestmentStatistics();
    this.getLoanSummary();
    this.getMonthlyLoanSummary();
    this.getInvestmentSummary();
    this.getMonthlyInvestmentSummary();
    //this.getDayWiseInvestmentSummary();
    //this.getDayWiseLoanSummary();
  }

  getInvestmentStatistics() {
    this.spinner.show();
    this.manualLendingService.getInvestmentStatistics(this.selectedInvType).subscribe({
      next: response => {
        this.data = { ...response };
        setTimeout(() => {
          this.spinner.hide();
        }, 5000);
      },
      error: e => {
        this.errorMessage = e.error ? e.error.message : 'Something went wrong, status=' + e.status;
        this.spinner.hide();
      }
    });
  }
  getMonthlyLoanSummary() {
    this.spinner.show();
    this.manualLendingService.getMonthlyLoanSummary().subscribe({
      next: response => {
        this.monthlyLoanSummary = this.transformDataForMonthlyLoanSummary(response);
        setTimeout(() => {
          this.spinner.hide();
        }, 5000);
      },
      error: e => {
        this.errorMessage = e.error ? e.error.message : 'Something went wrong, status=' + e.status;
        this.spinner.hide();
      }
    });
  }
  getLoanSummary() {
    this.spinner.show();
    this.manualLendingService.getLoanSummary().subscribe({
      next: response => {
        this.loanSummary = this.transformDataForLoanSummary(response);
        setTimeout(() => {
          this.spinner.hide();
        }, 5000);
      },
      error: e => {
        this.errorMessage = e.error ? e.error.message : 'Something went wrong, status=' + e.status;
        this.spinner.hide();
      }
    });
  }
  getDayWiseLoanSummary() {
    this.spinner.show();
    this.manualLendingService.getDayWiseLoanSummary().subscribe({
      next: response => {
        this.monthlyLoanSummary = this.transformDataForMonthlyLoanSummary(response);
        setTimeout(() => {
          this.spinner.hide();
        }, 5000);
      },
      error: e => {
        this.errorMessage = e.error ? e.error.message : 'Something went wrong, status=' + e.status;
        this.spinner.hide();
      }
    });
  }
  transformDataForMonthlyLoanSummary(data: any[]): any[] {
    const total = { name: 'Total Loan', series: [] as any[] };
    const active = { name: 'Active Loan', series: [] as any[] };
    const npa = { name: 'NPA Loan', series: [] as any[] };
    const closed = { name: 'Closed Loan', series: [] as any[] };

    data.forEach(item => {
      total.series.push({ name: item.month, value: item.total });
      active.series.push({ name: item.month, value: item.active });
      npa.series.push({ name: item.month, value: item.npa });
      closed.series.push({ name: item.month, value: item.closed });
    });

    return [total, active, npa, closed];
  }
  transformDataForLoanSummary(data: any[]): any[] {
    const total = { name: 'Total Loan', value: "" as string };
    const active = { name: 'Active Loan', value: "" as string };
    const npa = { name: 'NPA Loan', value: "" as string };
    const closed = { name: 'Closed Loan', value: "" as string };

    data.forEach(item => {
      total.value=item.total;
      active.value=item.active;
      npa.value=item.npa;
      closed.value=item.closed;
    });

    return [total, active, npa, closed];
  }
  getMonthlyInvestmentSummary() {
    this.spinner.show();
    this.manualLendingService.getMonthlyInvestmentSummary().subscribe({
      next: response => {
        this.monthlyInvestmentSummary = this.transformDataForMonthlyInvestmentSummary(response);
        setTimeout(() => {
          this.spinner.hide();
        }, 5000);
      },
      error: e => {
        this.errorMessage = e.error ? e.error.message : 'Something went wrong, status=' + e.status;
        this.spinner.hide();
      }
    });
  }
  getInvestmentSummary() {
    this.spinner.show();
    this.manualLendingService.getInvestmentSummary().subscribe({
      next: response => {
        this.investmentSummary = this.transformDataForInvestmentSummary(response);
        setTimeout(() => {
          this.spinner.hide();
        }, 5000);
      },
      error: e => {
        this.errorMessage = e.error ? e.error.message : 'Something went wrong, status=' + e.status;
        this.spinner.hide();
      }
    });
  }
  getDayWiseInvestmentSummary() {
    this.spinner.show();
    this.manualLendingService.getDayWiseInvestmentSummary().subscribe({
      next: response => {
        this.monthlyInvestmentSummary = this.transformDataForMonthlyInvestmentSummary(response);
        setTimeout(() => {
          this.spinner.hide();
        }, 5000);
      },
      error: e => {
        this.errorMessage = e.error ? e.error.message : 'Something went wrong, status=' + e.status;
        this.spinner.hide();
      }
    });
  }
  transformDataForMonthlyInvestmentSummary(data: any[]): any[] {
    const total = { name: 'Total Amount', series: [] as any[] };
    const active = { name: 'Active Amount', series: [] as any[] };
    const npa = { name: 'NPA Amount', series: [] as any[] };
    const closed = { name: 'Closed Amount', series: [] as any[] };

    data.forEach(item => {
      total.series.push({ name: item.month, value: item.inv_amount_total });
      active.series.push({ name: item.month, value: item.inv_amount_active });
      npa.series.push({ name: item.month, value: item.inv_amount_npa });
      closed.series.push({ name: item.month, value: item.inv_amount_closed });
    });
    return [total, active, npa, closed];
  }
  transformDataForInvestmentSummary(data: any[]): any[] {
    const total = { name: 'Total Amount', value: "" as string };
    const active = { name: 'Active Amount', value: "" as string };
    const npa = { name: 'NPA Amount', value: "" as string };
    const closed = { name: 'Closed Amount', value: "" as string };

    data.forEach(item => {
      total.value=item.inv_amount_total;
      active.value=item.inv_amount_active;
      npa.value=item.inv_amount_npa;
      closed.value=item.inv_amount_closed;
    });
    return [total, active, npa, closed];
  }

  onSelectionChange(selectedValue: string) {
    this.selectedInvType = selectedValue;
    this.getInvestmentStatistics();
  }

  view: [number, number] = [500, 400];
  colorScheme = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#42A5F5', '#AB47BC', '#EF5350', '#66BB6A']
  };
  onSelect(event: any) {
    console.log('Bar clicked:', event);
  }

  ///  line chats
  a_view: [number, number] = [900, 450];
  a_colorScheme = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#42A5F5', '#AB47BC', '#EF5350', '#66BB6A']
  };
  a_onSelect(event: any) {
    console.log('Line clicked:', event);
  }

  changeStats() {
		if(this.showMonthly){
      this.getMonthlyInvestmentSummary();
      this.getMonthlyLoanSummary();
    }
		else{
      this.getDayWiseInvestmentSummary();
      this.getDayWiseLoanSummary();
    }
	}

}
