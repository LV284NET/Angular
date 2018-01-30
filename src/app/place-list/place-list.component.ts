import { ActivatedRoute } from '@angular/router';
import { Constants } from './../constants';
import { Location } from '@angular/common';
import { PlacesService } from '../Services/places.service';
import { Place } from '../place';
import { element } from 'protractor';
import { MatIcon, MatCheckbox } from '@angular/material';
import { FavoriteService } from '../Services/favorite.service';
import { AuthorizationService } from "../Services/AuthorizationService";
import { Component, OnInit, Input, Inject } from '@angular/core';
import { SpinnerService } from '../Services/spinner.service';
import { FormControl, FormArray, FormGroup, FormBuilder } from '@angular/forms';


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
  countOfElements = 0;
  currentPage = 1;
  elementsPerPage;
  pagesToShow;

  filterMechanism = {
    filters: [
      { id: 1, name: 'Monument', selected: false },
      { id: 2, name: 'Church', selected: false },
      { id: 3, name: 'FoodAndDrink', selected: false },
      { id: 4, name: 'Theater', selected: false },
      { id: 5, name: 'Museum', selected: false },
      { id: 6, name: 'Park', selected: false },
      { id: 7, name: 'Shop', selected: false },
      { id: 8, name: 'Entertainment', selected: false },
      { id: 9, name: 'Sightseeing', selected: false },
      { id: 10, name: 'Bar', selected: false },
    ]
  };

  form: FormGroup;

  constructor(private placesService: PlacesService,
    private route: ActivatedRoute,
    private location: Location,
    public favoritePlace: FavoriteService,
    public authService: AuthorizationService,
    private spinnerService: SpinnerService,
    private fb: FormBuilder
  ) {
    this.elementsPerPage = Constants.PaginationConstants.ElementsPerPage;
    this.pagesToShow = Constants.PaginationConstants.PagesToShow;

    this.form = this.fb.group({
      filters: this.buildFilters()
    });
  }

  ngOnInit() {
    this.getFilteredPlacesList();
    this.getFilteredCount();
    if (this.authService.token != null)
      this.favoritePlace.getFavoritePlaces();

  }

  private checkExist(placeId: number): boolean {
    return this.favoritePlace.favoritesPlaces.some(x => x === placeId);
  }
/*
  getPlaceList() {
    //Show Load Animation
    this.spinnerService.ShowSpinner(Constants.SpinnerComponentConstants.AnimationName);

    this.loading = true;
    this.cityID = + this.route.snapshot.paramMap.get('cityId');
    this.places = [];

    this.placesService.getPlaces(this.cityID, this.currentPage, this.elementsPerPage).subscribe(response => {
      //Hide Load Animation
      this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);

      response.forEach(element => {
        this.places.push(new Place(element.PlaceId,
          element.Name, element.CityName, element.Description,
          element.PicturePlace)),
          this.cityName = element.CityName
      });
    });
    this.loading = false;
  }*/

  /*
  getCount() {
    //Show Load Animation
    this.spinnerService.ShowSpinner(Constants.SpinnerComponentConstants.AnimationName);

    this.loading = true;

    this.placesService.getPlacesCount(this.cityID).subscribe(response => {
      //Hide Load Animation
      this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);

      this.countOfElements = response;
    });

    this.loading = false;
  }
  */

  getFilteredCount() {
    //Show Load Animation
    this.spinnerService.ShowSpinner(Constants.SpinnerComponentConstants.AnimationName);
    this.loading = true;

    let checkedFilters = this.filterMechanism.filters.filter((element, index, array) => {
      return element.selected;
    });

    this.placesService.getCountFromFilteredPlaces(this.cityID,checkedFilters).subscribe(response => {
      //Hide Load Animation
      this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);

      this.countOfElements = response;
    });

    this.loading = false;
  }

  goToPage(n: number): void {
    this.currentPage = n;
    this.getFilteredPlacesList();

  }

  onNext(): void {
    this.currentPage++;
    this.getFilteredPlacesList();
  }

  onPrev(): void {
    this.currentPage--;
    this.getFilteredPlacesList();
  }

  buildFilters() {
    let arr = this.filterMechanism.filters.map(filter => {
      return this.fb.control(filter.selected);
    });
    return this.fb.array(arr);
  }

  get filters() {
    return this.form.get('filters') as FormArray;
  }

  getFilteredPlacesList() {
    this.spinnerService.ShowSpinner(Constants.SpinnerComponentConstants.AnimationName);

    this.loading = true;
    this.cityID = + this.route.snapshot.paramMap.get('cityId');
    this.places = [];

    let checkedFilters = this.filterMechanism.filters.filter((element, index, array) => {
      return element.selected;
    });

    this.placesService.getFilteredPlaces(checkedFilters, this.cityID, this.currentPage, this.elementsPerPage).subscribe(response => {
      this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);

      response.forEach(element => {
        this.places.push(new Place(element.PlaceId,
          element.Name, element.CityName, element.Description,
          element.PicturePlace)),
          this.cityName = element.CityName
      });
    });
    this.loading = false;
  }

  checkSelectedCheckbox(event) {
    this.filterMechanism.filters[event.source.id - 1].selected = event.checked;
  }
}
