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
import { MatAutocompleteModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FeedbackComponent } from './feedback/feedback.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './Services/profile.service';
import { RatingService } from './Services/rating.service';
import { WINDOW_PROVIDERS } from "./Services/window.service";
import { DisqusModule } from 'ngx-disqus';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FooterComponent } from './footer/footer.component';
import { StarRatingModule } from 'angular-star-rating';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService} from './Services/spinner.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Constants } from './constants';
import { TokenExpiredService } from './Services/token-expired.service';
import { BlaBlaCarService } from './Services/bla-bla-car.service';
import { SearchCitiesAndPlacesService } from './Services/search-cities-and-places.service';
import  './getFBSDK';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { AgmCoreModule } from '@agm/core';
import {GeolocationComponent} from './geolocation/geolocation.component';
import { BlablacarComponent } from './blablacar/blablacar.component';
import { GeolocationService } from './Services/geolocation.service';

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
    SpinnerComponent,
    FooterComponent,
    GoogleMapsComponent,
    GeolocationComponent,
    BlablacarComponent
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent,
    FeedbackComponent,
    ChangePasswordComponent,
    GoogleMapsComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    DisqusModule.forRoot('ngx'),
    StarRatingModule.forRoot(),
    MatCheckboxModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCmBhgQJgfQCQeClQDDqJKcDvft3_yBOss',
      libraries: ["places"]
    })
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
    RatingService,
    Constants,
    TokenExpiredService,
    SearchCitiesAndPlacesService,
    BlaBlaCarService,
    GeolocationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}