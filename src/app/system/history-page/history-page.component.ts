import { Component, OnDestroy, OnInit } from "@angular/core";
import { combineLatest, delay, Subscription } from "rxjs";
import { LoginComponent } from "src/app/auth/login/login.component";

import { Categories } from "../shared/models/categories.model";
import { EventModel } from "../shared/models/event.model";
import { CategoriesService } from "../shared/services/categories.service";
import { EventService } from "../shared/services/event.service";

@Component({
    selector: "wfm-history",
    templateUrl: "./history-page.component.html",
    styleUrls: ["./history-page.component.css"]
})
export class HistoryComponent implements OnInit, OnDestroy{
    
    private sub1!: Subscription;
    public dataCategories: Categories[] = [];
    public dataEvents: EventModel[] = [];
    isLoaded: boolean = false;

    public charData: Array<{name: string, value: number}> = [];

    constructor( private categoriesService: CategoriesService,
                 private eventsService: EventService) {

    }

    ngOnInit(): void {
        this.sub1 = combineLatest(this.eventsService.getEvents(), this.categoriesService.getCategories())
            .pipe(delay(500))
            .subscribe((data: any) => {
                this.isLoaded = true;
                
                this.dataEvents = data[0];    
                this.dataCategories = data[1];     

                this.dataCategories.forEach((c) => {
                    const charArr = this.dataEvents.filter((e) => {
                        return e.category === c.id && e.type === 'outcome'
                     })

                     this.charData.push({
                        name: c.name,
                        value: charArr.reduce((total, char) => {total += char.amount; return total},0)
                     })
                })
        })
    }

    ngOnDestroy(): void {
        if(this.sub1) this.sub1.unsubscribe();
    }
}