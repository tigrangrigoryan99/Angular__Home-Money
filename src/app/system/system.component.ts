import { Component, HostBinding, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { faidStateTrigger } from "../shared/animation/fade.animation";

@Component({
    selector: "wfm-system",
    templateUrl: "./system.component.html",
    styleUrls: ["./system.component.css"],
    animations: [faidStateTrigger]

})
export class SystemComponent implements OnInit {
    @HostBinding('@fade') fade: boolean = true;
    
    constructor(private router: Router) {

    }
    ngOnInit(): void {
        // this.router.navigate(['bill'])
    }
} 