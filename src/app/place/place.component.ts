import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlacesService } from '../Services/places.service';
import { Place } from '../place';
import { element } from 'protractor';
import { FavoriteService } from '../Services/favorite.service';
import { AuthorizationService } from "../Services/AuthorizationService";
import { Constants } from './../constants';
import { SpinnerService } from '../Services/spinner.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  page= "/city/" +this.route.snapshot.paramMap.get('cityId') + "/place/" + this.route.snapshot.paramMap.get('placeId');

  place: Place;
  filters: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private placesService: PlacesService,
    public favoritePlace: FavoriteService,
    public authService: AuthorizationService,
    private spinnerService: SpinnerService
  ) { 
    this.place = new Place(0, "", "", "", "");
  }

  ngOnInit() {
    this.getPlace();
    this.getPlaceFilters();
    if (this.authService.token != null)
       this.favoritePlace.getFavoritePlaces();
 }

  private checkExist(placeId: number): boolean
  {
    return this.favoritePlace.favoritesPlaces.some(x => x === placeId);
  }

  getPlace(): any {
    //Show Loading Animation
    this.spinnerService.ShowSpinner(Constants.SpinnerComponentConstants.AnimationName);

    const placeId = +this.route.snapshot.paramMap.get('placeId');

    this.placesService.getPlace(placeId)
      .subscribe(response => {
        //Hide Loading Animation
        this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);

        this.place = new Place (
          response.PlaceId, 
          response.Name, 
          response.CityName, 
          response.Description, 
          response.PicturePlace) 
      })
  }
  
  goBack(): void{
    this.location.back();
  }

  getPlaceFilters(){
    this.spinnerService.ShowSpinner(Constants.SpinnerComponentConstants.AnimationName);

    const placeId = +this.route.snapshot.paramMap.get('placeId');
    this.placesService.getPlaceFilters(placeId) .subscribe(response => {
      this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);

      response.forEach(element => {
        this.filters.push(element)
      });

          })
  }
}
