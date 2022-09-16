import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { User } from "src/app/shared/models/user.model";
import { AuthService } from "src/app/shared/services/auth.service";
import { UsersService } from "src/app/shared/services/users.service";
import { faidStateTrigger } from "src/app/shared/animation/fade.animation";

@Component({
    selector: "wfm-login",
    templateUrl: "login.component.html",
    styleUrls: ["login.component.css"],
    animations: [faidStateTrigger]
})

export class LoginComponent implements OnInit {

    public form!: FormGroup ;
    public newMessage: boolean = false;
    public succesMassage: boolean = false;
    public accessDenied: boolean = false;

    constructor( private userServics: UsersService, 
                 private authService: AuthService, 
                 private router: Router,
                 private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            if(params['nowCanLoggin']) {
                this.succesMassage = true;
                setTimeout(() => {
                    this.succesMassage = false;
                }, 5000);
            } else if(params['accessDenied']) {
                this.accessDenied = true;
                setTimeout(() => {
                    this.accessDenied = false;
                }, 5000);
            }
        })

        this.form = new FormGroup({
           'email': new FormControl(null, [Validators.required, Validators.email]),
           'password': new FormControl(null, [Validators.required, Validators.minLength(7)])
        })        
    }

    public onSubmit(): void {
        const formData = this.form.value;
 
        this.userServics.getUserByEmail(formData.email)
                .subscribe((user: User) => {
                   if(user) {
                        if(user.password === formData.password) {
                           window.localStorage.setItem('user', JSON.stringify(user));
                           this.authService.login();
                           this.router.navigate(['/system','bill'])

                        } else {
                            this.newMessage = true;
                            setTimeout(() => {
                                this.newMessage = false;
                            }, 5000);
                        }
                   } else {
                           this.newMessage = true;
                            setTimeout(() => {
                                this.newMessage = false;
                            }, 5000);
                   }
                });
   }
   
    
}