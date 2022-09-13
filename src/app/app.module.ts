import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UsersService } from './shared/services/users.service';
import { AuthService } from './shared/services/auth.service';
import { SystemRoutingModule } from './system/system-routing.module';
import { SystemModule } from './system/system.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    SystemModule,
    SystemRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [ 
    UsersService, 
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
