import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "src/app/shared/services/auth.service";

@Component({
    selector: "wfm-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
})

export class HeaderComponent implements OnInit{
    date: Date = new Date();
    user: any;
    userName: string = '';

    constructor ( private authService: AuthService,
                  private router: Router) {}
    
    ngOnInit(): void {
        this.user = window.localStorage.getItem('user');
        this.userName = JSON.parse(this.user)?.name; 
    }

    onLogOut(): void {     
        this.authService.logout();
        this.router.navigate(["/login"]);
    }

}