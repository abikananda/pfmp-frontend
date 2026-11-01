/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { TableData } from './table-data';
import { SortColumn, SortDirection } from './sortable.directive';
import { ManualLendingService } from '../../../../services/investment.service';
import { NgxSpinnerService } from 'ngx-spinner';

interface SearchResult {
	countries: TableData[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number): number => {

	// If both are strings, use localeCompare for proper sorting
	if (typeof v1 === 'string' && typeof v2 === 'string') {
		return v1.localeCompare(v2);
	}

	// Otherwise, compare numerically
	return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
};

function sort(countries: TableData[], column: SortColumn, direction: string): TableData[] {
	if (direction === '' || column === '') {
		return countries;
	} else {
		return [...countries].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}


function matches(country: TableData, term: string, pipe: PipeTransform) {
	return (
		country.particular.toLowerCase().includes(term.toLowerCase()) ||
		country.comments.toLowerCase().includes(term.toLowerCase()) ||
		country.loanStatus.toLowerCase().includes(term.toLowerCase()) ||
		country.npa.toLowerCase().includes(term.toLowerCase()) ||
		pipe.transform(country.invAmount).includes(term) ||
		pipe.transform(country.marketValue).includes(term)
	);
}

@Injectable({
	providedIn: 'root'
})
export class DataProviderService {
	COUNTRIES = new Array<TableData>();
	errorMessage!: string;
	private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private _countries$ = new BehaviorSubject<TableData[]>([]);
	private _total$ = new BehaviorSubject<number>(0);
	invType = "";
	private _state: State = {
		page: 1,
		pageSize: 10,
		searchTerm: '',
		sortColumn: '',
		sortDirection: '',
	};

	constructor(private pipe: DecimalPipe, private manualLendingService: ManualLendingService, private spinner: NgxSpinnerService) {
		this._search$
			.pipe(
				tap(() => this._loading$.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading$.next(false)),
			)
			.subscribe((result) => {
				this._countries$.next(result.countries);
				this._total$.next(result.total);
			});

		this._search$.next();
	}
	setInvType(invType: string) {
		this.invType = invType;
	}

	getInvestmentList() {
		this.spinner.show();
		this.manualLendingService.getInvestmentList(this.invType).subscribe({
            next: (data) => {
                this.COUNTRIES = typeof data === 'string' ? JSON.parse(data) : data;
				this._countries$.next(this.COUNTRIES);
				this._total$.next(this.COUNTRIES.length);
				this.spinner.hide();
            },
            error: (error) => {
                this.errorMessage = error.message || 'Something went wrong!';
				console.error('Error fetching investments:', error);
				this.spinner.hide();
            }
        });
	}
	get countries$() {
		return this._countries$.asObservable();
	}
	get total$() {
		return this._total$.asObservable();
	}
	get loading$() {
		return this._loading$.asObservable();
	}
	get page() {
		return this._state.page;
	}
	get pageSize() {
		return this._state.pageSize;
	}
	get searchTerm() {
		return this._state.searchTerm;
	}

	set page(page: number) {
		this._set({ page });
	}
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	set sortColumn(sortColumn: SortColumn) {
		this._set({ sortColumn });
	}
	set sortDirection(sortDirection: SortDirection) {
		this._set({ sortDirection });
	}

	private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}

	private _search(): Observable<SearchResult> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

		// 1. sort
		let countries = sort(this.COUNTRIES, sortColumn, sortDirection);

		// 2. filter
		countries = countries.filter((country) => matches(country, searchTerm, this.pipe));
		const total = countries.length;

		// 3. paginate
		countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ countries, total });
	}
}
