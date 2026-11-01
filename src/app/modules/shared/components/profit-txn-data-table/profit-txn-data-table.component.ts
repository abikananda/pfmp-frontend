import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { SortableDirective, SortEvent } from './sortable.directive';
import { TableData } from './table-data';
import { DataProviderService } from './data-provider.service';
import { DecimalPipe, AsyncPipe, CurrencyPipe, PercentPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared.module';

@Component({
	selector: 'app-profit-txn-data-table',
	standalone: true,
	imports: [CurrencyPipe, DatePipe, FormsModule, AsyncPipe, NgbHighlight, SortableDirective, NgbPaginationModule, SharedModule],
	providers: [DataProviderService, DecimalPipe, CurrencyPipe, PercentPipe, DatePipe],
	templateUrl: './profit-txn-data-table.component.html',
	styleUrl: './profit-txn-data-table.component.scss'
})
export class ProfitTxnDataTableComponent {
	countries$: Observable<TableData[]>;
	total$: Observable<number>;

	@ViewChildren(SortableDirective)
	headers!: QueryList<SortableDirective>;

	constructor(public service: DataProviderService) {
		this.service.getInvestmentList();
		this.countries$ = service.countries$;
		this.total$ = service.total$;
		this.service.searchTerm = this.getCurrentFinancialYear();
	}

	categories: Record<string, string[]> = {
		'Financial Year': ['All','FY2024_25', 'FY2025_26', 'FY2026_27', 'FY2027_28'],
		'Status': ['All','IN_PROGRESS', 'COMPLETED']
	};
	categoryKeys = Object.keys(this.categories);
	options: string[] = [];
	
	onCategoryChange(event: Event) {
		this.service.searchTerm = 'All';
		const selectedValue = (event.target as HTMLSelectElement).value;
		this.options = this.categories[selectedValue] || [];
	}
	
	onSort({ column, direction }: SortEvent) {
		// resetting other headers
		this.headers.forEach((header) => {
			if (header.column !== column) {
				header.direction = '';
			}
		});
		this.service.sortColumn = column;
		this.service.sortDirection = direction;
	}
	getCurrentFinancialYear(): string {
		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth() + 1;
	  
		const startYear = month >= 4 ? year : year - 1;
		const endYear = startYear + 1;
	  
		return `FY${startYear}_${endYear.toString().slice(-2)}`;
	  }
}
