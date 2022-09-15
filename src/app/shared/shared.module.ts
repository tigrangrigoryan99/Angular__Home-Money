import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingComponent } from "./components/loading/loading.component";

@NgModule({
    declarations: [ LoadingComponent ],
    imports: [ ReactiveFormsModule, 
        FormsModule ],
    exports: [ ReactiveFormsModule, 
        FormsModule, 
        LoadingComponent ],
    providers: []
})

export class SharedModule {}