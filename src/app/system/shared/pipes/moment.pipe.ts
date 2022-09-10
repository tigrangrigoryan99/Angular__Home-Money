import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment';

@Pipe({
    name: "moment",
})

export class MomentPipe implements PipeTransform {
    transform(value: any, formatFrom: string = "yyyy-mm-dd") {
        return moment(value, formatFrom).format('L');        
    }
}