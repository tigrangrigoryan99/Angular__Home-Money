import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Bill } from "../../shared/models/bill.model";

@Component({
    selector: "wfm-billcard",
    templateUrl: "./bill-card.component.html",
    styleUrls: ["./bill-card.component.css"]
})

export class BillCardComponent implements OnInit{
 
  dollar: number | null = null;
  euro: number | null = null;

  @Input('bill') bill!: Bill;
  @Input('currency') currency: any;

  ngOnInit(): void {
      this.dollar = this.bill.value * this.currency?.rates['USD'];  
      this.euro = this.bill.value * this.currency?.rates['EUR'];      
  }
}
