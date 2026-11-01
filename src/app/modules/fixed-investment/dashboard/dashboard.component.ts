import { Component } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { CardComponent } from '../../shared/components/card/card.component';
import { SharedModule } from '../../shared/shared.module';
import { FixedInvDataTableComponent } from '../../shared/components/fixed-inv-data-table/fixed-inv-data-table.component';
import { FixedInvestmentService } from '../../../services/fixed-investment.service';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';


export class DashData {
  realisedReturnPer: number;
  totalFundInvested: number;
  balanceAmountInBank: number;
  constructor() {
    this.realisedReturnPer = 0;
    this.totalFundInvested = 0;
    this.balanceAmountInBank = 0;
  }
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, CardComponent, SharedModule,FixedInvDataTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  data = new DashData();
  errorMessage!: string;
  invOptions = [
    { value: 'FINAL_PORTFOLIO', text: 'FINAL_PORTFOLIO' },
    { value: 'FD_RD', text: 'FD_RD' },
    { value: 'P2P', text: 'P2P' },
    { value: 'BOND', text: 'BOND' },
    { value: 'MUTUAL_FUND', text: 'MUTUAL_FUND' },
    { value: 'SAVING_BALANCE', text: 'SAVING_BALANCE' }
  ];
  selectedInvType = this.invOptions[0].value;
  chatData: unknown[] = [];

  constructor(private fixedInvestmentService: FixedInvestmentService,private logger: NGXLogger) {
    //this.logger.info("Debug message");
    //this.logger.error("Error message for server test post login");
    this.getInvestmentStatistics();
    this.getInvestmentAllocations();
  }
 
  getInvestmentAllocations() {
    this.fixedInvestmentService.getInvestmentAllocations().subscribe({
      next: response => {
        this.chatData = response.map(item => {
          const i = item as { name: string; expected: number; actual: number };
          return {
            name: i.name,
            series: [
              { name: 'Expected', value: i.expected },
              { name: 'Actual', value: i.actual }
            ]
          };
        });        
      },
      error: e => {
        this.errorMessage = e.error?e.error.message:'Something went wrong, status='+e.status;
      }
    });
  }
  getInvestmentStatistics() {
    this.fixedInvestmentService.getInvestmentStatistics(this.selectedInvType).subscribe({
      next: response => {
        this.data = { ...response };
      },
      error: e => {
        this.errorMessage = e.error?e.error.message:'Something went wrong, status='+e.status;
      }
    });
  }
  onSelectionChange(selectedValue: string) {
    this.selectedInvType = selectedValue;
    this.getInvestmentStatistics();
  }
  formatToLakhOrCrore(amount: number): string {
    if (amount == null || isNaN(amount)) return '';
    // Crore check (1 crore = 100 lakhs = 10,000,000)
    if (amount >= 10000000) {
      // Round to nearest crore
      const croreValue = (amount / 10000000).toFixed(2);
      return croreValue + ' cr';
    }
    if (amount >= 100000) {
      // Round to nearest lakh (do not show decimals)
      const lakhValue = (amount / 100000).toFixed(2);
      return lakhValue + ' lakh';
    }
    // Anything less than 1 lakh
    return amount.toString();
  }
  
  
  colorScheme = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#008FFB', '#FF4560']
  };
}
