import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthorizationService } from './Services/AuthorizationService';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Http, HttpModule } from '@angular/http';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import { PlacesService } from './Services/places.service';
<<<<<<< HEAD
=======
import { PlaceListComponent } from './place-list/place-list.component';
import { PlaceComponent } from './place/place.component';
import { CityService } from './Services/city.service';
import { CitiesComponent } from './cities/cities.component';
import { CityComponent } from './city/city.component';




>>>>>>> Backup-for-merge

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    RegisterComponent,
    LoginComponent,
    PlaceListComponent,
    PlaceComponent,
    CityComponent,
    CitiesComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    AppRoutingModule, 
    ReactiveFormsModule
  ],
  providers: [
    AuthorizationService,
    PlacesService,
    CityService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }