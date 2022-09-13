import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { combineLatest, delay, mergeMap, Subscription } from "rxjs";

import { Categories } from "../../shared/models/categories.model";
import { EventModel } from "../../shared/models/event.model";
import { CategoriesService } from "../../shared/services/categories.service";
import { EventService } from "../../shared/services/event.service";

@Component({
    selector: "wfm-historydetail",
    templateUrl: "./history-detail.component.html",
    styleUrls: ["./history-detail.component.css"]
})

export class HistoryDetailComponent implements OnInit, OnDestroy{
   
    public dataEvents: EventModel = {} as EventModel;
    public dataCategories!: Categories;
    public sub!: Subscription;
    public isLoaded: boolean = false;
    public srcImg: string = '';
    public id: string = '';

    constructor(private route: ActivatedRoute, 
                private eventsService: EventService,
                private categoriesService: CategoriesService) {
    }

    ngOnInit(): void {
        this.sub = this.route.params
            .pipe(mergeMap((params: Params)=> {return this.eventsService.getEventsById(params['id'])}),
                  mergeMap((event: EventModel)=> {  
                    this.dataEvents = event;
                    console.log(this.dataEvents);
                    return this.categoriesService.getCategoriesById(event['category'])}),
                    delay(500)
                    )
            .subscribe((dataCat: Categories) => { 
                this.isLoaded = true;
                this.dataCategories = dataCat;                 
        });  
        this.srcImg = "../../../../assets/img/arrowleft.png";  
    }

    public changeSrc(mouseMov: boolean): void {   
        mouseMov ? this.srcImg = "../../../../assets/img/hoverarrowleft.png" : this.srcImg = "../../../../assets/img/arrowleft.png";        
    }

    ngOnDestroy(): void {
        if(this.sub) this.sub.unsubscribe();
        this.isLoaded = false;
    }
}
