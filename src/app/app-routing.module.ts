import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRouter: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "system", loadChildren: () => import("./system/system.module").then((module) => module.SystemModule)}
]

@NgModule({
 declarations: [],
 imports: [RouterModule.forRoot(appRouter, {preloadingStrategy: PreloadAllModules})],
 exports: [RouterModule],
 providers: [],
})

export class AppRoutingModule {}
