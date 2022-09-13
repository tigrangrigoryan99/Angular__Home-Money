import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, debounceTime, distinct } from 'rxjs';
import { User } from '../models/user.model';
import { BillService } from 'src/app/system/shared/services/bill.service';

@Injectable()
export class UsersService extends BillService {
    constructor(public override http: HttpClient) {
        super(http);
    }
    
    public getUserByEmail(email: string): Observable<any> {
        return this.get(`users?email=${email}`).pipe(
            debounceTime(500),
            distinct(),
            map((user: any) => user[0] ? user[0] : undefined),
        );
        }
    public createNewUser(user: User): Observable<any> {
        return this.post(`users`, user);
    }
}