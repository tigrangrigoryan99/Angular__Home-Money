import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "filter",
})

export class FilterPipe implements PipeTransform {
    transform(events: any, value: any, fild: string): any {
        if(events.length === 0 || !value) {
            return events;
        }

        return events.filter((e: any) => {
          const t = Object.assign({}, e);

          if(fild === 'amount') {
            t[fild] += '';
          }

          if(fild === 'type') {
            t[fild] = t[fild] === 'income' ? 'Доход' : 'Расход';
          }

          if(fild === 'category') {
            t[fild] = t['catName'];
          }
        
          return  t[fild].toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
    }
}