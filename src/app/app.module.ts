import { PaginationComponent } from './pagination/pagination.component';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, ApplicationRef, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthorizationService } from './Services/AuthorizationService';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Http, HttpModule } from '@angular/http';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { PlacesService } from './Services/places.service';
import { PlaceListComponent } from './place-list/place-list.component';
import { PlaceComponent } from './place/place.component';
import { CityService } from './Services/city.service';
import { CitiesComponent } from './cities/cities.component';
import { CityComponent } from './city/city.component';
import { MatDialogModule, MatSnackBarModule, MatCheckbox } from '@angular/material';
import { ErrorHandlingService } from './Services/error-handling.service';
import { FavoriteService } from './Services/favorite.service';
import { MatAutocompleteModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { FeedbackComponent } from './feedback/feedback.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './Services/profile.service';
import { WINDOW_PROVIDERS } from "./Services/window.service";
import { DisqusModule } from 'ngx-disqus';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FooterComponent } from './footer/footer.component'; 
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService} from './Services/spinner.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Constants } from './constants'

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
    CitiesComponent,
    FeedbackComponent,
    ProfileComponent,
    ChangePasswordComponent,
    PaginationComponent,
    FooterComponent,
    SpinnerComponent,
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent,
    FeedbackComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    CommonModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCheckboxModule,
    DisqusModule.forRoot('ngx')
  ],
  providers: [
    AuthorizationService,
    PlacesService,
    CityService,
    ErrorHandlingService,
    FavoriteService,
    ProfileService,
    WINDOW_PROVIDERS,
    SpinnerService,
    Constants
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }