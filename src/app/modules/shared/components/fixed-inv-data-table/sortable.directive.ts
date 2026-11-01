import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { TableData } from './fixed-inv-table-data';


export type SortColumn = keyof TableData | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: Record<string, SortDirection> = { asc: 'desc', desc: '', '': 'asc' };

export interface SortEvent {
	column: SortColumn;
	direction: SortDirection;
}

@Directive({
	selector: 'th[appSortable]',
	standalone: true,
	host: {
		'[class.asc]': 'direction === "asc"',
		'[class.desc]': 'direction === "desc"',
		'(click)': 'rotate()',
	},
})
export class SortableDirective {
	@Input() column: SortColumn = '';
	@Input() direction: SortDirection = '';
	@Output() sort = new EventEmitter<SortEvent>();

	rotate() {
		this.direction = rotate[this.direction];
		this.sort.emit({ column: this.column, direction: this.direction });
	}
}
