import { Component, OnDestroy, OnInit } from "@angular/core";
import { combineLatest, delay, Subscription } from "rxjs";
import * as moment from "moment";

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
    public isLoaded: boolean = false;
    public charData: Array<{name: string, value: number}> = [];
    public isFilterVisible: boolean = false;
    public filteredEvenets: EventModel[] = [];

    constructor( private categoriesService: CategoriesService,
                 private eventsService: EventService) {

    }

    ngOnInit(): void {
        this.sub1 = combineLatest(this.eventsService.getEvents(), this.categoriesService.getCategories())
            .pipe(delay(500))
            .subscribe((data: any) => {
                                
                this.dataEvents = data[0];    
                this.dataCategories = data[1]; 
                
                this.setOriginalEvents();
                this.calculateCharDate();

                this.isLoaded = true;               
        })        
    }

    private calculateCharDate(): void {
        this.dataCategories.forEach((c) => {
            const charArr = this.filteredEvenets.filter((e) => {
                return e.category === c.id && e.type === 'outcome'
             })

             this.charData.push({
                name: c.name,
                value: charArr.reduce((total, char) => {total += char.amount; return total},0)
             })
        });
    }

    private toggleFilterVisibility(dir: boolean): void {
        this.isFilterVisible = dir;
    }

    public openFilter() {
        this.toggleFilterVisibility(true);
    }

    private setOriginalEvents(): void {
        this.filteredEvenets = this.dataEvents.slice();        
    }

    onFilterCancel() {
        this.toggleFilterVisibility(false);
        this.setOriginalEvents();
        this.calculateCharDate();
    }

    onFilterApply(filterData: any) {
        this.setOriginalEvents();
        this.toggleFilterVisibility(false);

        const startPeriod = moment().startOf(filterData.period).startOf('d');
        const endPeriod = moment().endOf(filterData.period).endOf('d'); 

        this.filteredEvenets = this.filteredEvenets.filter((e) => {
            return filterData.types.indexOf(e.type) !== -1;               
        }).filter((e) => {
            return filterData.categories.indexOf(e.category.toString()) !== -1;                                   
         }) .filter((e) => {
            return moment(e.date, 'DD.MM.YYYY HH:mm:ss').isBetween(startPeriod, endPeriod);
        });    
        this.calculateCharDate();
    }

    ngOnDestroy(): void {
        if(this.sub1) this.sub1.unsubscribe();
    }
}