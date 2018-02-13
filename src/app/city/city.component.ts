import { CityService } from './../Services/city.service';
import { Place } from './../place';
import { City } from './../city';
import { BlaBlaCarInfo } from './../blablacarInfo';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PlacesService } from '../Services/places.service';
import { Location } from '@angular/common';
import { FavoriteService } from '../Services/favorite.service';
import { AuthorizationService } from "../Services/AuthorizationService";
import { Component, OnInit, Input, Inject } from '@angular/core';
import { SpinnerService } from '../Services/spinner.service';
import { BlaBlaCarService } from '../Services/bla-bla-car.service';
import { Constants } from './../constants';
import { error } from 'util';

import { Http } from '@angular/http';
import { GeolocationData } from './../geolocationData';
import { GeolocationService } from '../Services/geolocation.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})

export class CityComponent implements OnInit {

  //#region Private Properties

  private latitude: any;

  private longitude: any;

  public currentGeolocationData: GeolocationData;

  private options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  //#endregion

  //#region Public Properties

  public page = "/city/" + this.route.snapshot.paramMap.get('cityId');
  public city: City;
  public places: Place[] = [];

  //#endregion


  minDate = new Date(2018, 1, 9);
  @Input() travelDate: Date;
  blablacarErrorMessage: string;
  //@Input() currentLocation: string = 'Lviv';
  @Input() currentCityName: string;
  blablacarInfo: BlaBlaCarInfo;
  getBlaBlaCarResult: boolean = false;
  isCurrentCityNameLoaded: boolean = false;

  //#region Constructor

  constructor(private placeService: PlacesService,
    private cityService: CityService,
    private route: ActivatedRoute,
    private location: Location,
    private spinnerService: SpinnerService,
    public favoritePlace: FavoriteService,
    public authService: AuthorizationService,
    public blaBlaCarService: BlaBlaCarService,
    private http: Http,
    private geolocationService: GeolocationService
  ) { }

  //#endregion

  ngOnInit() {
    this.getCity();

    this.getPlaces();

    if (localStorage.getItem("currentUser") != null)
      this.favoritePlace.getFavoritePlaces();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.successCallback,
        this.errorCallback,
        this.options)
    };

    if (this.currentCityName != null) {
      this.isCurrentCityNameLoaded = true;
    }
  }

  //#region Private Methods

  blaBlaCarFormToggle(){
    this.currentCityName = this.currentGeolocationData.GetCityName();

    if (this.currentCityName != null) {
      this.isCurrentCityNameLoaded = true;

      this.getBlaBlaCarInfo()
    }
  }

  private checkExist(placeId: number): boolean {
    return this.favoritePlace.favoritesPlaces.some(x => x === placeId);
  }

  private getCity() {

    //Show Load Animation
    this.spinnerService.ShowSpinner(Constants.SpinnerComponentConstants.AnimationName);

    const id = +this.route.snapshot.paramMap.get('cityId');

    this.cityService.getCityById(id)
      .subscribe(response => {

        //Hide Load Animation
        this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);

        this.city = new City(response.Id, response.Name,
          response.Description, response.PicturePath, response.CityRating);

        //this.getBlaBlaCarInfo();
      });
  }

  private getCityRating(cityRating: number): any {
    if (cityRating != 0) {
      return cityRating.toString();
    }
    return "";
  }


  getDateInString(): string {
    if (this.travelDate) {
      return this.travelDate.toDateString();
    }
  }

  getBlaBlaCarInfo() {
    this.blaBlaCarService.getBlaBlaCarInfo(this.currentCityName, this.city.name, this.getDateInString()).subscribe(
      response => {
        this.getBlaBlaCarResult = true;
        this.blablacarInfo = new BlaBlaCarInfo(response.LowestPrice, response.HighestPrice,
          response.TravelTime, response.Distance, response.CountOfSuggestions, response.Link);
      },
      error => {
        this.blablacarInfo = null;
        this.getBlaBlaCarResult = true;
        this.blablacarErrorMessage = JSON.parse(error._body).Message;
      }
    )
  }

  getBlaBlaCarTime(TravelTime: number): any {
    let secondInMinute = 60;

    let timeInMinute = TravelTime / secondInMinute;
    if (timeInMinute > secondInMinute) {
      return Math.floor(timeInMinute / secondInMinute) + " h " + timeInMinute % secondInMinute + " m";
    }

  }

  private getPlaces() {
    this.spinnerService.ShowSpinner(Constants.SpinnerComponentConstants.AnimationName);

    const id = +this.route.snapshot.paramMap.get('cityId');

    this.placeService.getTopPlacesByCityId(id)
      .subscribe(response => {
        response.forEach(element => {

          this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);

          this.places.push(new Place(element.PlaceId,
            element.Name, element.CityName, element.Description,
            element.PicturePlace));
        });
      });
  }

  //#endregion

  private errorCallback = (error) => {
    let errorMessage = 'Unknown error';
    switch (error.code) {
      case 1:
        errorMessage = 'Permission denied';
        break;
      case 2:
        errorMessage = 'Position unavailable';
        break;
      case 3:
        errorMessage = 'Timeout';
        break;
    }
    console.log(errorMessage);
  };

  private successCallback = (position) => {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.currentGeolocationData = this.geolocationService
      .GetInfoAboutCurrenLocation(this.latitude, this.longitude);
  }

  //#endregion
}
