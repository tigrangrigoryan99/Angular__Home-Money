import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from "../shared/shared.module";
import { BillCardComponent } from "./bill-page/bill-card/bill-card.component";
import { BillComponent } from "./bill-page/bill-page.component";
import { CurrencyCardComponent } from "./bill-page/currency-card/currency-card.component";
import { HistroyChartComponent } from "./history-page/history-chart/history-chart.component";
import { HistoryDetailComponent } from "./history-page/history-detail/history-detail.component";
import { HistoryEvenetsComponent } from "./history-page/history-events/history-events.component";
import { HIstoryFilterComponent } from "./history-page/history-filter/history-filter.component";
import { HistoryComponent } from "./history-page/history-page.component";
import { PlanningComponent } from "./planning-page/planning-page.component";
import { AddCategoryComponent } from "./records-page/add-category/add-catregory.component";
import { AddEventComponent } from "./records-page/add-event/add-event.component";
import { EditCategoryComponent } from "./records-page/edit-category/edit-category.component";
import { RecordsComponent } from "./records-page/records-page.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";
import { DropdownDirective } from "./shared/directives/dropdown.directive";
import { MomentPipe } from "./shared/pipes/moment.pipe";
import { FilterPipe } from "./shared/pipes/filter.pipe";
import { BillService } from "./shared/services/bill.service";
import { CategoriesService } from "./shared/services/categories.service";
import { EventService } from "./shared/services/event.service";
import { SystemRoutingModule } from "./system-routing.module";
import { SystemComponent } from "./system.component";

@NgModule({
    declarations: [
        /* Components */
        SystemComponent,
        BillComponent,
        HistoryComponent,
        PlanningComponent,
        RecordsComponent,
        SidebarComponent,
        HeaderComponent,
        BillCardComponent,
        CurrencyCardComponent,
        AddEventComponent,
        AddCategoryComponent,
        EditCategoryComponent,
        HistroyChartComponent,
        HistoryDetailComponent,
        HistoryEvenetsComponent,
        HIstoryFilterComponent,

        /* Directives */
        DropdownDirective,

        /* Pipes */
        MomentPipe,
        FilterPipe
      ],
    imports: [
        CommonModule, 
        SharedModule,
        SystemRoutingModule,
        NgxChartsModule
    ],
    exports: [
        
    ],
    providers: [
        BillService, 
        CategoriesService,
        EventService
    ]
})
export class SystemModule {

}