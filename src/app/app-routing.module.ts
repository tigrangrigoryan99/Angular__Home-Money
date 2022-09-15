import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const appRouter: Routes = [
  {path: '', redirectTo: "login", pathMatch: "full"},
  {path: 'system', loadChildren: () => import("./system/system.module").then((module) => module.SystemModule)},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-foun'}
]

@NgModule({
 declarations: [],
 imports: [RouterModule.forRoot(appRouter, {preloadingStrategy: PreloadAllModules})],
 exports: [RouterModule],
 providers: [],
})

export class AppRoutingModule {}
