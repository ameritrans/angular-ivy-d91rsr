import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
// ag-grid
import { AgGridModule } from "@ag-grid-community/angular";
// application
import { AppComponent } from "./app.component";

// rich grid
import { RichGridComponent } from "./rich-grid-example/rich-grid.component";
import { DateComponent } from "./date-component/date.component";
import { SortableHeaderComponent } from "./header-component/sortable-header.component";
import { HeaderGroupComponent } from "./header-group-component/header-group.component";
import { RendererComponent } from './renderer-component/renderer.component';
import { ProficiencyFilter } from "./filters/proficiency.component.filter";
import { SkillFilter } from "./filters/skill.component.filter";

import { HttpClientModule } from '@angular/common/http';
import { CellRendererSimpleComponent } from "./cellrenderer-simple.component/cellrenderer-simple.component";
import { TotalValueRenderer } from "./cellrenderer-simple.component/total-value-renderer.component";
import { MedalCellRenderer} from "./cellrenderer-simple.component/medal-cell-renderer.component";

import { SimpleComponent } from "./simple.component/simple.component";
import { CustomTooltip} from "./cellrenderer-simple.component/custom-tooltip.component";
import { DataService } from "./services/data.sevice";

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AgGridModule.withComponents(
			[
				DateComponent,
				SortableHeaderComponent,
				HeaderGroupComponent,
				RendererComponent,
				ProficiencyFilter,
				SkillFilter,
				CellRendererSimpleComponent,
				TotalValueRenderer,
				MedalCellRenderer,
				SimpleComponent,
				CustomTooltip
			]
		)
	],
	declarations: [
		AppComponent,
		RichGridComponent,
		DateComponent,
		SortableHeaderComponent,
		HeaderGroupComponent,
		RendererComponent,
		ProficiencyFilter,
		SkillFilter,
		CellRendererSimpleComponent,
		TotalValueRenderer,
		MedalCellRenderer,
		SimpleComponent,
		CustomTooltip
	],
	providers: [DataService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
