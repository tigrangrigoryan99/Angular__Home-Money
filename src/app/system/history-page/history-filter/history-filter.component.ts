import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Categories } from "../../shared/models/categories.model";

@Component({
    selector: "wfm-historyfilter",
    templateUrl: "./history-filter.component.html",
    styleUrls: ["./history-filter.component.css"]
})

export class HIstoryFilterComponent {
    @Output('onFilterApply') onApply = new EventEmitter<any>();
    @Output('onFilterCancel') onCancel = new EventEmitter<any>();

    @Input('dataCat') categories: Categories[] = [];

    public timePeriods: Array<{type: string, label: string}> = [
        {type: 'd', label: 'День'},
        {type: 'w', label: 'Неделя'},
        {type: 'M', label: 'Месяц'}
    ];
    public typeEvents: Array<{type: string, label: string}> = [
        {type: 'income', label: 'Доход'},
        {type: 'outcome', label: 'Расход'}
    ];
    public selectedPeriod: string = 'd';
    public selectedTypes: Array<String> = [];
    public selectedCtegories: Array<String> = [];

    constructor() {
        
    }

    private calculateInputParams(arr: any, checked: boolean, value: string): void {
        if(checked) {
            arr.indexOf(value) === -1 ? arr.push(value) : null;               
        } else {
            arr = arr.filter((i: any) => {return i !== value});
        }  
    }

    handleChangeType(target: any) {
        const {checked, value} = target;
        this.calculateInputParams(this['selectedTypes'], checked, value);
    }

    handelChangeCat(target: any) {
        const {checked, value} = target;
        this.calculateInputParams(this['selectedCtegories'], checked, value);
    }

    onFilterApply() {
        this.onApply.emit({
            types: this.selectedTypes,
            categories: this.selectedCtegories,
            period: this.selectedPeriod,
        });
    }

    onFilterCancel() {
        this.onCancel.emit();
    }
    
}