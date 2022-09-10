import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { BaseAPI } from "src/app/shared/core/base-api";
import { EventModel } from "../models/event.model";

@Injectable()
export class EventService extends BaseAPI{
    constructor(public override http: HttpClient) {
        super(http);
    }

    public getEvents(): Observable<any> {
        return this.get('events');
    }

    public addEvent(event: EventModel): Observable<any> {
        return this.post('events', event);
    }
    public getEventsById(id: string | number): Observable<any> {
        return this.get(`events/${id}`);
    }

}