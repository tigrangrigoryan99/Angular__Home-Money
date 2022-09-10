import { Component, OnDestroy, OnInit } from "@angular/core";
import { combineLatest, delay, Subscription } from "rxjs";

import { Bill } from "../shared/models/bill.model";
import { Categories } from "../shared/models/categories.model";
import { EventModel } from "../shared/models/event.model";
import { BillService } from "../shared/services/bill.service";
import { CategoriesService } from "../shared/services/categories.service";
import { EventService } from "../shared/services/event.service";

@Component({
    selector: "wfm-planning",
    templateUrl: "./planning-page.component.html",
    styleUrls: ["./planning-page.component.css"]
})
export class PlanningComponent implements OnInit, OnDestroy{
    
    private sub!: Subscription;
    public bill!: Bill;
    public categories: Categories[] = [];
    public events: EventModel[] = [];
    public isLoaded: boolean = false;

    constructor(private billService: BillService,
                private categoriesService: CategoriesService,
                private eventService: EventService) {

    }

    ngOnInit(): void {
        this.sub = combineLatest(this.billService.getBill(),
            this.categoriesService.getCategories(),
            this.eventService.getEvents())
            .pipe(delay(500))
            .subscribe((data: [Bill, Categories[], EventModel[]]) => {
                this.isLoaded = true;
               
                this.bill = data[0];
                this.categories = data[1];
                this.events = data[2];
            });
    }

    public getCategoryCost(cat: Categories): number {
        const catEvents = this.events.filter((evt: EventModel) => {
           return evt.category === cat.id && evt.type === 'outcome';
        })

        return catEvents.reduce((total, evt) => {
            return total += evt.amount;
        }, 0);
    }

    private getPercent(cat: Categories): number {
        const percent = (this.getCategoryCost(cat)/cat.capacity)*100;
        // return (percent > 100) ? 100 : (percent < 0) ? 0 : percent;
          return (percent > 100) ? 100 : (percent < 0) ? 0 : percent;
    }

    public getCatPercent(cat: Categories): string {
        return this.getPercent(cat) + "%";
    }

    public getCatColorClass(cat: Categories): string {
        const percent = this.getPercent(cat);
        return (percent < 60) ? 'success': (percent >= 100) ? 'danger' : 'normal';
    }

    ngOnDestroy(): void {
        if(this.sub) this.sub.unsubscribe();
    }
}