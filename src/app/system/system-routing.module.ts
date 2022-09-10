import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BillComponent } from "./bill-page/bill-page.component";
import { HistoryDetailComponent } from "./history-page/history-detail/history-detail.component";
import { HistoryComponent } from "./history-page/history-page.component";
import { PlanningComponent } from "./planning-page/planning-page.component";
import { RecordsComponent } from "./records-page/records-page.component";
import { SystemComponent } from "./system.component";

const systemRoutes: Routes = [
    {path: "system", component: SystemComponent, children: [
        {path: "bill", component: BillComponent},
        {path: "history", component: HistoryComponent},
        {path: "planning", component: PlanningComponent},
        {path: "records", component: RecordsComponent},
        {path: "history/:id", component: HistoryDetailComponent}
    ]}
]

@NgModule({
    imports: [RouterModule.forChild(systemRoutes)],
    exports: [RouterModule]
})
export class SystemRoutingModule {}