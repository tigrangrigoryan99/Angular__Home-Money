import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { BaseAPI } from "src/app/shared/core/base-api";
import { Bill } from "../models/bill.model";



@Injectable()
export class BillService extends BaseAPI{

    constructor(public override http: HttpClient) {
        super(http);
    }

    private time: any = new Date().getTime();
    
    getBill(): Observable<any> {
        return this.get("bill");
    }

    updateBill(bill: Bill): Observable<any> {
        return this.put("bill", bill);
    }

    getCurrency(bill: string = 'RUB'): any {     
        return this.http.get(`https://api.exchangerate.host/latest?base=${bill}`);      
    }
}