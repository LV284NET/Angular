import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlacesService } from '../Services/places.service';
import { Place } from '../place';
import { element } from 'protractor';
import { FavoriteService } from '../Services/favorite.service';
import { AuthorizationService } from "../Services/AuthorizationService";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  place: Place;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private placesService: PlacesService,
    public favoritePlace: FavoriteService,
    public authService: AuthorizationService
  ) { 
    this.place = new Place(0, "", "", "", "");
  }

  ngOnInit() {
    this.getPlace();
    this.favoritePlace.getFavoritePlaces();
  }

  private checkExist(placeId: number): boolean
  {
    return this.favoritePlace.favoritesPlaces.some(x => x === placeId);
  }
  getPlace(): any {
    
    const placeId = +this.route.snapshot.paramMap.get('placeId')

    this.placesService.getPlace(placeId)
      .subscribe(response => {
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
}
