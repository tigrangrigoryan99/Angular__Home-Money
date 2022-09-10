import { Component, Input, OnInit } from "@angular/core";
import { Categories } from "../../shared/models/categories.model";
import { EventModel } from "../../shared/models/event.model";

@Component({
    selector: "wfm-historyevents",
    templateUrl: "./history-events.component.html",
    styleUrls: ["./history-events.component.css"]
})

export class HistoryEvenetsComponent implements OnInit{

    @Input('dataEvt') dataEvt!: EventModel[];
    @Input('dataCat') dataCat!: Categories[];

    public searchValue: string | Date | number = ''
    public searchPlaceholder: string = 'Сумма';
    public searchField: string = 'amount';

    constructor() {

    }

    ngOnInit(): void {
        this.dataEvt.forEach((e) => {
           e.catName = this.dataCat.find((c) => { return e.category === c.id; })?.name;
        });               
    }

    public getEventClass(e: EventModel): {} {
        return {
            'label': true,
            'label-danger': e.type === 'outcome',
            'label-success': e.type === 'income',
        }
    }

    public getPlaceholderName(fildName: string) {
        const namesMap: any = {
            amount: 'Сумма',
            date: 'Дата',
            category: 'Категория',
            type: 'Тип'
        };

        this.searchPlaceholder = namesMap[fildName];
        this.searchField = fildName;
    }
}