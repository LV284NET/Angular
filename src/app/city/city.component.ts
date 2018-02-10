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

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})

export class CityComponent implements OnInit {
  minDate = new Date(2018, 1, 9);
  @Input() travelDate: Date;
  page= "/city/" +this.route.snapshot.paramMap.get('cityId');
  city: City;
  places: Place[] = [];
  @Input() currentLocation: string = 'Lviv';
  blablacarInfo: BlaBlaCarInfo;
  constructor(private placeService: PlacesService,
    private cityService: CityService,
    private route: ActivatedRoute,
    private location: Location,
    private spinnerService: SpinnerService,
    public favoritePlace: FavoriteService,
    public authService: AuthorizationService,
    public blaBlaCarService: BlaBlaCarService
  ) { }

  ngOnInit() {
    this.getCity();
    this.getPlaces();
    if (localStorage.getItem("currentUser") != null)
      this.favoritePlace.getFavoritePlaces();
  }

  private checkExist(placeId: number): boolean {
    return this.favoritePlace.favoritesPlaces.some(x => x === placeId);
  }

  getCity() {
    this.spinnerService.ShowSpinner(Constants.SpinnerComponentConstants.AnimationName);

    const id = +this.route.snapshot.paramMap.get('cityId');

    this.cityService.getCityById(id)
      .subscribe(response => {

        this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);

        this.city = new City(response.Id, response.Name,
          response.Description, response.PicturePath, response.CityRating);
        
        this.getBlaBlaCarInfo();
      });
  }

  getCityRating(cityRating: number): any{
    if(cityRating != 0)
    { 
      return cityRating.toString();
    }
    return "";
  }


  getDateInString():string{
    if (this.travelDate)
    {
      return this.travelDate.toDateString();
    }
  }

  getBlaBlaCarInfo(){
    this.blaBlaCarService.getBlaBlaCarInfo(this.currentLocation, this.city.name, this.getDateInString()).subscribe(
      response => {
        this.blablacarInfo = new BlaBlaCarInfo(response.LowestPrice, response.HighestPrice,
                              response.TravelTime, response.Distance, response.CountOfSuggestions, response.Link );
        }
    )
  }

  getBlaBlaCarTime(TravelTime: number): any{
    let secondInMinute= 60; 
    
    let timeInMinute = TravelTime/secondInMinute;
    if (timeInMinute > secondInMinute)
    {
      return Math.floor(timeInMinute/secondInMinute) + " h " + timeInMinute%secondInMinute + " m";
    }

  }
  
  getPlaces() {
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
}
