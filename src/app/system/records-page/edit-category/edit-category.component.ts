import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { Categories } from "../../shared/models/categories.model";
import { CategoriesService } from "../../shared/services/categories.service";

@Component({
    selector: "wfm-editcategory",
    templateUrl: "./edit-category.component.html",
    styleUrls: ["./edit-category.component.css"]
})

export class EditCategoryComponent implements OnInit, OnDestroy{
    
    @Input('categories') categories!: Categories[];
    @Output('onCategoryEdit') EditCategori = new EventEmitter();
    
    public categoriId: any = 1;
    public currentCategori: any;
    public newMessage: boolean = false;
    private sub1!: Subscription;

    constructor(private categoryService: CategoriesService) {
     }

    ngOnInit(): void {
        this.onCategoryChange(); 
    }

    onCategoryChange(): void {
        this.currentCategori = this.categories
            .find(c => c.id === +this.categoriId);
    }

    onSubmit(form: NgForm): void {
        let { name, capacity } = form.value;
        let editCategori = new Categories(name, capacity, +this.categoriId);           

        this.sub1 = this.categoryService.editCategories(editCategori)
            .subscribe((editedCategory) => {
                this.EditCategori.emit(editCategori); 
                this.newMessage = true;
                setTimeout(() => {
                    this.newMessage = false
                }, 3000);   
            });
    }

    ngOnDestroy(): void {
        if(this.sub1) this.sub1.unsubscribe();
        }
}