import { Component, OnInit } from "@angular/core";
import { delay } from "rxjs";

import { Categories } from "../shared/models/categories.model";
import { CategoriesService } from "../shared/services/categories.service";

@Component({
    selector: "wfm-records",
    templateUrl: "./records-page.component.html",
    styleUrls: ["./records-page.component.css"]
})

export class RecordsComponent implements OnInit{

    public categories!: Categories[];
    public isLoadded: boolean = false;

    constructor(private categoriService: CategoriesService) {
    }

    ngOnInit(): void {
        this.categoriService.getCategories()
            .pipe(delay(500))
            .subscribe((categories: Categories[]) => {
                this.categories = categories;    
                this.isLoadded = true;
            })
    }

    onAddCategory(categori: Categories): void {
       this.categories.push(categori);      
    }

    onEditCategory(categori: Categories): void {
        const ind = this.categories.findIndex(c => categori.id === c.id);
        this.categories[ind] = categori;       
    }
}