import { Component, OnInit } from '@angular/core';
import { ManualLendingService } from '../../../services/investment.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { SharedModule } from '../../shared/shared.module';
import { ProfitTxnDataTableComponent } from '../../shared/components/profit-txn-data-table/profit-txn-data-table.component';

export class AccountDashData {
  currentAccBalance: number;
  currentFYPrincipalAmt: number;
  currentFYReturnPer: number;
  currentFYReturnAmount: number;
  currentFYUnrealisedReturnPer: number;
  currentFYUnrealisedReturnAmount: number;
  totalReturnPer: number;
  totalReturnAmount: number;
  totAmtTransferToAcc: number;
  
  constructor() {
    this.currentAccBalance = 0;
    this.currentFYPrincipalAmt = 0;
    this.currentFYReturnPer = 0;
    this.currentFYReturnAmount = 0;
    this.currentFYUnrealisedReturnPer = 0;
    this.currentFYUnrealisedReturnAmount = 0;
    this.totalReturnPer = 0;
    this.totalReturnAmount = 0;
    this.totAmtTransferToAcc=0;
  }
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent, SharedModule, ProfitTxnDataTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  data = new AccountDashData();
  errorMessage!: string;

  constructor(private manualLendingService: ManualLendingService) {

  }
  ngOnInit(): void {
    this.getInvestmentStatistics();
  }

  getInvestmentStatistics() {
    this.manualLendingService.getOtherAccountStatistics().subscribe({
      next: response => {
        this.data = { ...response };
      },
      error: e => {
        this.errorMessage = e.error ? e.error.message : 'Something went wrong, status=' + e.status;
      }
    });
  }
}
