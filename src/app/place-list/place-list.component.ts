import { ActivatedRoute } from '@angular/router';
import { Constants } from './../constants';
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
  loading = false;
  total = 0;
  page = 1;
  pageSize;
  pagesToShow;

  constructor(private placesService: PlacesService,
    private route: ActivatedRoute,
    private location: Location,
    public favoritePlace: FavoriteService,
    public authService: AuthorizationService)   
  {  
    this.pageSize = Constants.paginationPerPage;
    this.pagesToShow = Constants.paginationPagesToShow;
  }

  ngOnInit() {
    this.getPlaceList();
    this.getCount();
    if (this.authService.token != null)
      this.favoritePlace.getFavoritePlaces();

  }

  private checkExist(placeId: number): boolean
  {
    return this.favoritePlace.favoritesPlaces.some(x => x === placeId);
  }

  getPlaceList() {
    this.loading=true;
     this.cityID = + this.route.snapshot.paramMap.get('cityId');
    this.places = [];

    this.placesService.getPlaces(this.cityID,this.page,this.pageSize).subscribe(response => {
      response.forEach(element => {
        this.places.push(new Place(element.PlaceId,
          element.Name, element.CityName, element.Description,
          element.PicturePlace)), 
        this.cityName = element.CityName
      });
    });
    this.loading=false;
  }

  getCount(){
    this.loading=true;

    this.placesService.getPlacesCount(this.cityID).subscribe(response => { 
      this.total = response
    });

    this.loading=false;
  }

  goToPage(n: number): void {
    this.page = n;
    this.getPlaceList();

  }

  onNext(): void {
    this.page++;
    this.getPlaceList();
  }

  onPrev(): void {
    this.page--;
    this.getPlaceList();
  }
}
