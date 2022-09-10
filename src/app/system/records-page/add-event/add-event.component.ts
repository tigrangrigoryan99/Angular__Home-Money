import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { mergeMap, Subscription } from "rxjs";

import { Categories } from "../../shared/models/categories.model";
import { EventModel } from "../../shared/models/event.model";
import * as moment from 'moment';
import { EventService } from "../../shared/services/event.service";
import { BillService } from "../../shared/services/bill.service";
import { Bill } from "../../shared/models/bill.model";

@Component({
    selector: "wfm-addevent",
    templateUrl: "./add-event.component.html",
    styleUrls: ["./add-event.component.css"]
})

export class AddEventComponent implements OnInit, OnDestroy {
    @Input('categories') categories!: Categories[];

    public types: Array<{types: string, label: string}> = [
        {types: "income", label: "Доход"},
        {types: "outcome", label: "Расход"},
    ]
    public newMessage: boolean = false; 
    public valueBill: number | null = null;
    private sub1!: Subscription;
    private sub2!: Subscription;

    constructor( private eventService: EventService,
                 private billService: BillService ) {
    }

    ngOnInit(): void {
    }

    onSubmit(form: NgForm) {
        let { type, amount, category, description} = form.value;
        let date = moment().format('DD.MM.YYYY HH:MM:SS');
        
        const newEvent: any = new EventModel(type, amount, category, description, date);     

        this.sub1 = this.billService.getBill()
            .subscribe((bill: Bill) => {
                let value: number = 0;

                if(type = "output") {
                    if( amount > bill.value ) {
                        this.valueBill = amount - bill.value;

                        this.newMessage = true;
                        setTimeout(() => {
                            this.newMessage = false;
                        }, 3000);
                        return;
                    } else {
                        value = bill.value - amount;
                    }
                } else {
                    value = bill.value + amount;
                }

        this.sub2 = this.billService.updateBill({value, currency: bill.currency})
                    .pipe(mergeMap(() => this.eventService.addEvent(newEvent)))
                    .subscribe((data) => {
                        form.setValue({
                            type: "output",
                            amount: 0,
                            category: 1,
                            description: "",
                        })          
                    });
            });
    }

    ngOnDestroy(): void {
       if(this.sub1) this.sub1.unsubscribe();
       if(this.sub2) this.sub2.unsubscribe();
    }
}