import { Component, ViewEncapsulation } from '@angular/core';
//import { HttpClient } from '@angular/common/http';

// for enterprise features
import { AllModules, ColumnApi, GridApi, Module, ColDef, ColGroupDef, GridReadyEvent, CellClickedEvent, CellDoubleClickedEvent, CellContextMenuEvent } from '@ag-grid-enterprise/all-modules';

// for community features
// import {Module, CommunityModules} from "@ag-grid-community/all-modules";

// set your key here
// import {LicenseManager} from "@ag-grid-enterprise/all-modules";
// LicenseManager.setLicenseKey(<your key>);

import { MedalCellRenderer } from '../cellrenderer-simple.component/medal-cell-renderer.component';
import { TotalValueRenderer } from '../cellrenderer-simple.component/total-value-renderer.component';
import { CustomTooltip } from '../cellrenderer-simple.component/custom-tooltip.component';
import { DataService } from 'app/services/data.sevice';

@Component({
	selector: 'simple',
	templateUrl: 'simple.component.html',
	encapsulation: ViewEncapsulation.None
})
export class SimpleComponent {
	
	public rowData: any[];
	public columnDefs: (ColDef | ColGroupDef)[];
	public excelStyles;

	public _rowCount: string;

	public defaultColDef: ColDef;
	public frameworkComponents: any;
	public sideBar: false;

	public modules: Module[] = AllModules;

	public api: GridApi;
	public columnApi: ColumnApi;

	public tooltipShowDelay;

	// public defaultExcelExportParams;
  	// public excelStyles;

	constructor(/*private _http: HttpClient*/ private _data_service: DataService) {

		this.tooltipShowDelay = 0;

		this.columnDefs = [
			{ 
				field: 'athlete' ,
				tooltipField: 'athlete'
	
			},
			{ field: 'year' },
			{
				field: 'gold',
				cellRenderer: 'medalCellRenderer',
				tooltipField: 'gold'
			},
			{
				field: 'silver',
				//cellRenderer: 'medalCellRenderer',
				cellClassRules: {
					greenBackground: function (params) {
						return params.value > 1;
					},
					redFont: function (params) {
						return params.value < 1;
					}
				}
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
			customTooltip: CustomTooltip
		};
		
		this.defaultColDef = {
			editable: true,
			sortable: true,
			flex: 1,
			minWidth: 100,
			filter: true,
			resizable: true,
			tooltipComponent: 'customTooltip'
		};

		this.excelStyles = [
			
			{
				id: 'greenBackground',
				interior: {
					color: '#b5e6b5',
					pattern: 'Solid',
				},
			},
			{
				id: 'redFont',
				font: {
					fontName: 'Calibri Light',
					underline: 'Single',
					italic: true,
					color: '#ff0000',
				},
			}
			
		];
	}

	
	private calculateRowCount() {
		if (this.api && this.rowData) {
			const model = this.api.getModel();
			const totalRows = this.rowData.length;
			const processedRows = model.getRowCount();
			this._rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
		}
	}

	public onModelUpdated() {
		console.log('onModelUpdated');
		this.calculateRowCount();
	}


	onGridReady(params: GridReadyEvent) {

		this.api = params.api;
		this.columnApi = params.columnApi;

		this.api.sizeColumnsToFit();
		this.calculateRowCount();

		// this._http
		// 	.get('https://www.ag-grid.com/example-assets/olympic-winners.json')
		// 	.subscribe((data: any) => {
		// 		//debugger
		// 		this.rowData = data;
		// 	});

		this._data_service.get().subscribe(data => {
			this.rowData = data;
			this._data_service.randomize(data);
		});
	}

	public onCellClicked($event: CellClickedEvent) {
		console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
	}

	public onCellDoubleClicked($event: CellDoubleClickedEvent) {
		console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
	}

	public onCellContextMenu($event: CellContextMenuEvent) {
		console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
	}

	public toggleSidebar($event) {
		this.sideBar = $event.target.checked;
	}

	onBtExport() {
		this.api.exportDataAsExcel();
	}
}



