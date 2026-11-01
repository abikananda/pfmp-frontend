import { Component, Input, OnChanges, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { SortableDirective, SortEvent } from './sortable.directive';
import { TableData } from './table-data';
import { DataProviderService } from './data-provider.service';
import { DecimalPipe, AsyncPipe, CurrencyPipe, PercentPipe, DatePipe } from '@angular/common';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared.module';

@Component({
	selector: 'app-inv-data-table',
	standalone: true,
	imports: [DecimalPipe, CurrencyPipe, PercentPipe, AsyncPipe, NgbHighlight, SortableDirective, NgbPaginationModule,SharedModule],
	providers: [DataProviderService, DecimalPipe, CurrencyPipe, PercentPipe, DatePipe],
	templateUrl: './inv-data-table.component.html',
	styleUrl: './inv-data-table.component.scss'
})
export class InvDataTableComponent implements OnChanges {
	countries$: Observable<TableData[]>;
	total$: Observable<number>;
	showOnlyActive=true;

	@ViewChildren(SortableDirective)
	headers!: QueryList<SortableDirective>;
	@Input() 
	invType: string | undefined;

	constructor(public service: DataProviderService) {
		this.service.setInvType(this.invType ? this.invType : "MANUAL_LENDING");
		this.service.getInvestmentList();
		this.countries$ = service.countries$;
		this.total$ = service.total$;
		this.filterItems();
	}
	ngOnChanges(changes: SimpleChanges): void {
		if (changes['invType']) {
			this.service.setInvType(this.invType ? this.invType : "MANUAL_LENDING");
			this.service.getInvestmentList();
			this.service.pageSize = 10;
		}
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

	hideColumn() {
		return this.invType != 'MANUAL_LENDING';
	}
	filterItems() {
		if(this.showOnlyActive)
			this.service.searchTerm  = 'ACTIVE';
		else
			this.service.searchTerm = '';
	}
}