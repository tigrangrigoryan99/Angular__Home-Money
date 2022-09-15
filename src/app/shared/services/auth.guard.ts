import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Route, Router, RouterStateSnapshot, Routes, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{
    constructor( private auth: AuthService,
                 private router: Router ) {
    }

    canActivate( route: ActivatedRouteSnapshot,
                 state: RouterStateSnapshot ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.auth.isLoggedIn()) {
             return true;
         } else {
             this.router.navigate(['/login'], {
                queryParams: {
                    accessDenied: true,
                }
             });
             return false;
         }
    }

    canActivateChild( childRoute: ActivatedRouteSnapshot, 
                      state: RouterStateSnapshot ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }
}