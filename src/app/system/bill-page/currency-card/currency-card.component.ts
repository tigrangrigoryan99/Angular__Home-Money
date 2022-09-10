import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "wfm-currencycard",
    templateUrl: "./currency-card.component.html",
    styleUrls: ["./currency-card.component.css"]
})
export class CurrencyCardComponent implements OnInit{
 
    @Input('currency') currency: any;

    currencies: Array<string> = ['USD', 'EUR'];

    constructor() {}

    ngOnInit(): void {        
    }
}