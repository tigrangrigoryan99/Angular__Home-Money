import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRouter: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"}
]

@NgModule({
 declarations: [],
 imports: [RouterModule.forRoot(appRouter)],
 exports: [RouterModule],
 providers: [],
})

export class AppRoutingModule {}
