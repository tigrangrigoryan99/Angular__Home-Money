import { Component, HostBinding } from "@angular/core";
import { faidStateTrigger } from "../shared/animation/fade.animation";

@Component({
    selector: "wfm-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.css"],
    animations: [faidStateTrigger]
})

export class AuthComponent {
    @HostBinding('@fade') fade: boolean = true;
}