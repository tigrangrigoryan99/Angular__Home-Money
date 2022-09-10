import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "src/app/shared/models/user.model";
import { UsersService } from "src/app/shared/services/users.service";

@Component({
    selector: "wfm-reg",
    templateUrl: "registration.component.html",
    styleUrls: ["registration.component.css"]
})

export class RegistrationComponent implements OnInit{
    form!: FormGroup;

    constructor(private userService: UsersService, private router: Router) {

    }
    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail.bind(this)),
            password: new FormControl(null, [Validators.required, Validators.minLength(7)]),
            name: new FormControl(null, [Validators.required]),
            agree: new FormControl(false, [Validators.requiredTrue]),
        })        
    }

    onSubmitForm(): void {
        const {email, password, name} = this.form.value;
        const user = new User(email, password, name);
        
        this.userService.createNewUser(user)
            .subscribe((user: User) => {
                this.router.navigate(['/login'], {
                    queryParams: {
                        nowCanLoggin: false,
                    }
                });
                console.log('Zaregistrirovan');
                
            })
    }

    forbiddenEmail(control: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.userService.getUserByEmail(control.value)
            .subscribe((user: User) => {
                if(user) {
                    resolve({
                        forbEmail: true,
                    }) 
                    } else {
                        resolve(null);
                    }
                })
        })
    }

}