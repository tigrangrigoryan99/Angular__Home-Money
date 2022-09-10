import { Component, OnInit, Output, EventEmitter, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { Categories } from "../../shared/models/categories.model";
import { CategoriesService } from "../../shared/services/categories.service";

@Component({
    selector: "wfm-addcategory",
    templateUrl: "./add-category.component.html",
    styleUrls: ["./add-category.component.css"]
})

export class AddCategoryComponent implements OnInit, OnDestroy{

    constructor(private categoriesService: CategoriesService) {
    }

    private sub1!: Subscription;

    ngOnInit(): void {
    }

    @Output('onCategoryAdd') newCategory = new EventEmitter();

    onSubmit(form: NgForm) {
        let { name, capacity } = form.value;
        const category = new Categories(name, capacity);
        
        this.sub1 = this.categoriesService.addCategories(category)
            .subscribe((category) => {
                form.reset();
                this.newCategory.emit(category); 
            })
    }

    ngOnDestroy(): void {
        if(this.sub1) this.sub1.unsubscribe();
    }
}