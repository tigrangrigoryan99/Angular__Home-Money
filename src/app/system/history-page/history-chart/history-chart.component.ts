import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'wfm-historychart',
    templateUrl: "./history-chart.component.html",
    styleUrls: ["./history-chart.component.css"]

})

export class HistroyChartComponent implements OnInit{
  
  @Input('data') dataCat: any;
  constructor () {

  }

  ngOnInit(): void {
      // console.log(this.dataCat);
         
  }
}