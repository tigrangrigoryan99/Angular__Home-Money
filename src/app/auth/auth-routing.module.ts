import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { AuthComponent } from "./auth.component";

const authRoutes: Routes = [
    {path: "", component: AuthComponent, children: [
        {path: "login", component: LoginComponent},
        {path: "registration", component: RegistrationComponent}
    ]}
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule],
    providers: []
})

export class AuthRoutingModule {}