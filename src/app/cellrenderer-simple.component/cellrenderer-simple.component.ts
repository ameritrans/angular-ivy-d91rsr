import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MedalCellRenderer } from './medal-cell-renderer.component';
import { TotalValueRenderer } from './total-value-renderer.component';

//import { AllModules, Module } from '@ag-grid-enterprise/all-modules';
import { Module, AllCommunityModules } from "@ag-grid-community/all-modules";

@Component({
	selector: 'cellrenderer-simple',
	template: `<ag-grid-angular
		#agGrid
		style="width: 100%; height: 100%;"
		id="myGrid"
		class="ag-theme-balham"
		[columnDefs]="columnDefs"
		[frameworkComponents]="frameworkComponents"
		[defaultColDef]="defaultColDef"
		[rowData]="rowData"
		[modules]="modules"
		(gridReady)="onGridReady($event)"
	></ag-grid-angular> `,
})
export class CellRendererSimpleComponent {
	gridApi;
	gridColumnApi;

	public columnDefs;
	public frameworkComponents;
	public defaultColDef;
	public rowData: [];

	public modules: Module[] = AllCommunityModules;

	constructor(private http: HttpClient) {

		this.columnDefs = [
			{ field: 'athlete' },
			{ field: 'year' },
			{
				field: 'gold',
				cellRenderer: 'medalCellRenderer',
			},
			{
				field: 'silver',
				cellRenderer: 'medalCellRenderer',
			},
			{
				field: 'bronze',
				cellRenderer: 'medalCellRenderer',
			},
			{
				field: 'total',
				minWidth: 175,
				cellRenderer: 'totalValueRenderer',
			},
		];
		
		this.frameworkComponents = {
			medalCellRenderer: MedalCellRenderer,
			totalValueRenderer: TotalValueRenderer,
		};
		
		this.defaultColDef = {
			editable: true,
			sortable: true,
			flex: 1,
			minWidth: 100,
			filter: true,
			resizable: true,
		};
	}

	onGridReady(params) {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;

		this.http
			.get('https://www.ag-grid.com/example-assets/olympic-winners.json')
			.subscribe((data: any) => {
				debugger
				this.rowData = data;
			});
	}
}
