import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { BaseAPI } from "src/app/shared/core/base-api";
import { Categories } from "../models/categories.model";

@Injectable()
export class CategoriesService extends BaseAPI {
    
    constructor (public override http: HttpClient) {
        super(http);
    }

    public getCategories(): Observable<any> {
        return this.get('categories');
    }
    
    public addCategories(category: Categories): Observable<any> {
        return this.post('categories', category);
    }

    public editCategories(category: Categories): Observable<any> {
        return this.put(`categories/${category.id}`, category);
    }
    public getCategoriesById(id: string | number): Observable<any> {
        return this.get(`categories/${id}`);
    }
}