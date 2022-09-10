import { Component, OnDestroy, OnInit } from "@angular/core";
import { combineLatest, delay, Subscription } from "rxjs";

import { Bill } from "../shared/models/bill.model";
import { BillService } from "../shared/services/bill.service";

@Component({
    selector: "wfm-bill",
    templateUrl: "./bill-page.component.html",
    styleUrls: ["./bill-page.component.css"]
})
export class BillComponent implements OnInit, OnDestroy {
    
    subscribtion1!: Subscription;
    subscribtion2!: Subscription;
    bill!: Bill;
    currency: any;
    isLoaded: boolean = false;

    constructor(private billService: BillService) {}

    ngOnInit(): void {
        this.subscribtion1 = combineLatest(
            this.billService.getBill(),
            this.billService.getCurrency(),
        )
        .pipe(delay(500))
        .subscribe((data: [Bill, any]) => {
           this.bill = data[0];
           this.currency = data[1];  
           this.isLoaded = true;              
        })
    }

    onRefresh(): void {
        this.isLoaded = false; 
        this.subscribtion2 = combineLatest(
            this.billService.getBill(),
            this.billService.getCurrency(),
        )
        .pipe(delay(500))
        .subscribe((data: [Bill, any]) => {
           this.bill = data[0];
           this.currency = data[1];  
           this.isLoaded = true;                     
        })
    }

    ngOnDestroy(): void {
        this.subscribtion1.unsubscribe();
        if(this.subscribtion2) {
            this.subscribtion2.unsubscribe();
        }   
        this.isLoaded = false;      
    }

}