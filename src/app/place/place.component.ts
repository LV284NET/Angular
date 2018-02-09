import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlacesService } from '../Services/places.service';
import { Place } from '../place';
import { element } from 'protractor';
import { FavoriteService } from '../Services/favorite.service';
import { AuthorizationService } from "../Services/AuthorizationService";
import { OnClickEvent } from "angular-star-rating/star-rating-struct";
import { Constants } from './../constants';
import { SpinnerService } from '../Services/spinner.service';
import { RatingService } from '../Services/rating.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  onClickResult: OnClickEvent;

  page = "/city/" + this.route.snapshot.paramMap.get('cityId') +
    "/place/" + this.route.snapshot.paramMap.get('placeId');

  place: Place;
  userRating: number = 0;
  filters: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private placesService: PlacesService,
    public favoritePlace: FavoriteService,
    public authService: AuthorizationService,
    private spinnerService: SpinnerService,
    private ratingService: RatingService,
    private snackBar: MatSnackBar,
  ) {
    this.place = new Place(0, "", "", "", "");
  }

  ngOnInit() {
    this.getPlace();
    this.getPlaceFilters();
    if (this.authService.token != null) {
      this.favoritePlace.getFavoritePlaces();
    }
  }

  private checkExist(placeId: number): boolean {
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

        this.place = new Place(
          response.PlaceId,
          response.Name,
          response.CityName,
          response.Description,
          response.PicturePlace,
          0,
          response.PlaceRating);
        if (this.authService.token != null) {
          this.getUserRatingForPlace(response.PlaceId)
        }
      })
  }

  getPlaceRating(placeRating: number): any {
    if (placeRating != 0 && placeRating != null) {
      return placeRating.toString();
    }
    return "";
  }

  getUserRatingForPlace(placeId): any {
    this.ratingService.getUserRatingOfPlace(placeId).subscribe(
      response => { this.userRating = response },
      error => { this.userRating = 0 }
    )
  }

  setPlaceRating = ($event: OnClickEvent) => {

    if (this.userRating != $event.rating) {
      this.ratingService.SetUserRatingOfPlace(this.place.placeId, $event.rating).subscribe(
        response => {
          this.userRating = $event.rating;
          this.snackBar.open("Your rating saved", "Got it", { duration: 500 });
          this.ratingService.getPlacePating(this.place.placeId).subscribe(
            response => { this.place.rating = response }
          )
        },
        error => { }
      )
    }
    else {
      this.ratingService.DeleteUserRatingOfPlace(this.place.placeId).subscribe(
        response => {
        this.userRating = 0,
          this.ratingService.getPlacePating(this.place.placeId).subscribe(
            response => { this.place.rating = response }
          ),
          this.snackBar.open("Your rating deleted", "Got it", { duration: 500 });
        }
      )
    }
  }

  getTextForLabelRating(placeRating: number): string {
    if (placeRating != 0)
      return "Average: " + placeRating;
    else
      return "";

  }

  goBack(): void {
    this.location.back();
  }

  getPlaceFilters() {
    this.spinnerService.ShowSpinner(Constants.SpinnerComponentConstants.AnimationName);

    const placeId = +this.route.snapshot.paramMap.get('placeId');
    this.placesService.getPlaceFilters(placeId).subscribe(response => {
      this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);

      response.forEach(element => {
        this.filters.push(element)
      });

    })
  }
}
