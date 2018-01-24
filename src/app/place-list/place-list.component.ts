import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlacesService } from '../Services/places.service';
import { Place } from '../place';
import { element } from 'protractor';
import {MatIcon} from '@angular/material';
import { FavoriteService } from '../Services/favorite.service';
import { AuthorizationService } from "../Services/AuthorizationService";
import { Component, OnInit, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {

  places: Place[] = [];
  cityID: number;
  cityName: string;

  constructor(private placesService: PlacesService,
    private route: ActivatedRoute,
    private location: Location,
    public favoritePlace: FavoriteService,
    public authService: AuthorizationService
  )   {  
  }

  ngOnInit() {
    this.getPlaceList();
    if (this.authService.token != null)
      this.favoritePlace.getFavoritePlaces();

  }

  private checkExist(placeId: number): boolean
  {
    return this.favoritePlace.favoritesPlaces.some(x => x === placeId);
  }

  getPlaceList() {
     this.cityID = + this.route.snapshot.paramMap.get('cityId');

    this.placesService.getPlaces(this.cityID).subscribe(response => {
      response.forEach(element => {
        this.places.push(new Place(element.PlaceId,
          element.Name, element.CityName, element.Description,
          element.PicturePlace)), 
        this.cityName = element.CityName
      });
    });
  }
}
