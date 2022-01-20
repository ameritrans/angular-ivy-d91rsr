import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

	constructor(private _http: HttpClient) { }

	data: any[];

	get(): Observable<any> {
		return this._http.get('https://www.ag-grid.com/example-assets/olympic-winners.json');
	}

	randomize(data: any) {

		//debugger

		this.data = JSON.parse(JSON.stringify(data));

		this.data.forEach(element => {
			element.gold = element.gold + Math.round(10 * Math.random());	
		});

		console.log(JSON.stringify(this.data));
	}
}
