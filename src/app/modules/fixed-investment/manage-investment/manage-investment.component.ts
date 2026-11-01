import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { TableData } from '../../shared/components/inv-data-table/table-data';
import { SharedModule } from '../../shared/shared.module';
import { AddInvestment } from '../../../models/AddInvestment';
import { FixedInvestmentService } from '../../../services/fixed-investment.service';
import { UpdateInvestment } from '../../../models/UpdateInvestment';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, Subject, switchMap } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';



@Component({
  selector: 'app-manage-investment',
  standalone: true,
  imports: [SharedModule, CardComponent, NgSelectModule],
  templateUrl: './manage-investment.component.html',
  styleUrl: './manage-investment.component.scss'
})
export class ManageInvestmentComponent {
  data!: TableData[];
  errorMessage!: string;
  addInvestmentForm: Record<string, unknown> = {};
  updateInvestmentForm: Record<string, unknown> = {};
  addInvestmentInfo: AddInvestment | undefined;
  updateInvestmentInfo: UpdateInvestment | undefined;
  requestSubmitted = false;
  requestSubmitted2 = false;
  public model: unknown;
  invOptions = [
    { value: 'FD_RD', text: 'FD_RD' },
    { value: 'P2P', text: 'P2P' },
    { value: 'BOND', text: 'BOND' },
    { value: 'MUTUAL_FUND', text: 'MUTUAL_FUND' },
    { value: 'SAVING_BALANCE', text: 'SAVING_BALANCE' },
    { value: 'FINAL_PORTFOLIO', text: 'FINAL_PORTFOLIO' }
  ];
  selectedInvType: string | null = null;
  items: unknown[] = [];
  search$ = new Subject<string>();
  
  constructor(private fixedInvestmentService: FixedInvestmentService) {
      this.search$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.searchItems(term))
      )
      .subscribe(results => {
        this.items = results;
      });
  }
  
  searchItems(term: string): Observable<Record<string, unknown>[]> {
    if (this.selectedInvType != null) {
      return this.fixedInvestmentService.getParticulars(this.selectedInvType).pipe(
        map(items => items.filter(item =>{
          const particular = item['particular'] as string;
          return particular.toLowerCase().includes(term.toLowerCase())
        })),
        catchError(() => of([]))
      );
    } else {
      this.errorMessage = "Choose a Investment Type";
      return of([]);
    }
  }
  addInvestment() {
    if (this.selectedInvType != null) {
      this.requestSubmitted = false
      this.requestSubmitted2 = false;
      console.log('form submit add ' + JSON.stringify(this.addInvestmentForm));
      this.addInvestmentInfo = new AddInvestment(
        this.addInvestmentForm['particulars'] as string,
        this.addInvestmentForm['investmentAmount'] as number,
        this.addInvestmentForm['annualInterest'] as number);

      this.fixedInvestmentService.addInvestment(this.selectedInvType == null ? "" : this.selectedInvType, this.addInvestmentInfo).subscribe({
        next: data => {
          this.errorMessage = JSON.stringify(data);
          this.requestSubmitted = true;
        },
        error: e => {
          this.errorMessage = e.error ? e.error.message : 'Something went wrong, status=' + e.status;
          this.requestSubmitted = true;
        }
      });
    } else {
      this.errorMessage = "Choose a Investment Type";
      this.requestSubmitted = true;
    }
  }

  updateInvestment() {
    if (this.selectedInvType != null) {
      this.requestSubmitted = false
      this.requestSubmitted2 = false;
      let selectedDate;
      
      if(this.updateInvestmentForm['maturityDate'] != undefined){
        const maturity = this.updateInvestmentForm['maturityDate'] as { year: number; month: number; day: number };
        selectedDate = new Date(Date.UTC(maturity.year, maturity.month - 1, maturity.day));
        selectedDate= selectedDate.toISOString();
      }
      console.log('form submit update ' + selectedDate);
      this.updateInvestmentInfo = new UpdateInvestment(
        this.updateInvestmentForm['particulars2'] as string,
        this.updateInvestmentForm['investmentStatus'] as string,
        this.updateInvestmentForm['investmentAmount2'] as string,
        this.updateInvestmentForm['annualInterest2'] as number,
        this.updateInvestmentForm['comments'] as string,
        this.updateInvestmentForm['otherIncome'] as number,
        selectedDate!);

      this.fixedInvestmentService.updateInvestment(this.selectedInvType == null ? "" : this.selectedInvType, this.updateInvestmentInfo).subscribe({
        next: data => {
          this.errorMessage = JSON.stringify(data);
          this.requestSubmitted2 = true;
        },
        error: e => {
          this.errorMessage = e.error ? e.error.message : 'Something went wrong, status=' + e.status;
          this.requestSubmitted2 = true;
        }
      });
    } else {
      this.errorMessage = "Choose a Investment Type";
      this.requestSubmitted2 = true;
    }
  }
}
