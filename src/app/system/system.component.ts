import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "wfm-system",
    templateUrl: "./system.component.html",
    styleUrls: ["./system.component.css"],


})
export class SystemComponent implements OnInit {
    constructor(private router: Router) {

    }
    ngOnInit(): void {
        // this.router.navigate(['bill'])
    }
} 