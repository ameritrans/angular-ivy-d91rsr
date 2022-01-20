import { Component } from '@angular/core';

import { AgRendererComponent } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/all-modules';
import { DataService } from 'app/services/data.sevice';

@Component({
	selector: 'medal-component',
	templateUrl: 'medal-cell-renderer.component.html',
})
export class MedalCellRenderer implements AgRendererComponent {

	displayValue: string;

	count: number;
	count_new: number

	constructor(private _data_service: DataService) {
	}

	agInit(params: ICellRendererParams): void {	

		var col_id: any = params.column.getColId();
		this.count_new = this._data_service.data[params.rowIndex][col_id];
		console.log(this.count_new);

		this.count = parseInt(params.value, 10);

		this.displayValue = new Array(this.count)
			.fill('#')
			.join('') + params.column.getColId() + ' ' + params.rowIndex;
	}

	refresh(params: ICellRendererParams): boolean {
		return false;
	}
}
