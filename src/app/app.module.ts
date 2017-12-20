import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthorizationService } from './Services/AuthorizationService';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Http, HttpModule } from '@angular/http';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [
    AuthorizationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }