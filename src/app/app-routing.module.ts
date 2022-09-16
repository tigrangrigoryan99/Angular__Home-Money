import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const appRouter: Routes = [
  {path: 'system', loadChildren: () => import("./system/system.module").then((module) => module.SystemModule)},
  {path: 'auth', loadChildren: () => import("./auth/auth.module").then((module) => module.AuthModule)},
  {path: '**', component: NotFoundComponent},
]

@NgModule({
 declarations: [],
 imports: [RouterModule.forRoot(appRouter, {preloadingStrategy: PreloadAllModules})],
 exports: [RouterModule],
 providers: [],
})

export class AppRoutingModule {}
