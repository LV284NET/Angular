import { forEach } from '@angular/router/src/utils/collection';
import { ActivatedRoute, Router } from '@angular/router';
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
import { RatingService } from '../Services/rating.service';
import { Observable } from "rxjs/Observable";
import { NullAstVisitor } from '@angular/compiler';
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
  currentPage;
  elementsPerPage;
  pagesToShow;

  filterMechanism = {filters:[]} 
  form: FormGroup;

  constructor(private placesService: PlacesService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public favoritePlace: FavoriteService,
    public authService: AuthorizationService,
    private spinnerService: SpinnerService,
    private ratingService: RatingService,
    private fb: FormBuilder,
  )   
  {  
    this.getStandartParams();
    this.getFilters();

  }

  ngOnInit() {
    this.getCityIdFromUrl();
    this.getCheckedFiltersFromUrl();
    
    this.form = this.fb.group({
      filters: this.buildFilters()
    });

    this.getPageSizeFromUrl();
    this.getFilteredCount();
    this.getPageFromUrl();
    this.getFilteredPlacesList();
 
    if (this.authService.token != null)
      this.favoritePlace.getFavoritePlaces();

  }

  getPageFromUrl(){
    let page;

    this.route.queryParams.subscribe(params =>{
      page = +params['pageNumber']
    });

    if(page > 0 )
    { this.currentPage= page;}

    if(page > (this.countOfElements/this.elementsPerPage))
      {this.currentPage=Constants.PaginationConstants.FirstPage
      this.changeRoutes();}

    else
    { this.changeRoutes();}
  }

  getPageSizeFromUrl(){
    let pageSize;

    this.route.queryParams.subscribe(params =>{
      pageSize = +params['pageSize']
    });

    if(pageSize > 0)
    { this.elementsPerPage= pageSize;}
    
    else
    { this.changeRoutes();}
  }

  getCityIdFromUrl(){
    this.cityID = + this.route.snapshot.paramMap.get('cityId');
  }

  getCheckedFiltersFromUrl(){
    let selectedFilters: Array<string>;

    this.route.queryParams.subscribe(params =>{
      selectedFilters = params['filter']
    });

    if(selectedFilters != null && selectedFilters.length !=0){
    selectedFilters.forEach(element =>{
      for(let j=0, lenfilters=this.filterMechanism.filters.length;
         j<lenfilters; j++ ){
           if(element == this.filterMechanism.filters[j].name){
             this.filterMechanism.filters[j].selected=true;
           }
        }
      })
    } 
  }

  changeRoutes(){
    let filters:string[] = this.filterTostringArray();

    this.router.navigate(['/city/'+ this.cityID +'/place-list'],  
    { queryParams: 
      {pageSize: this.elementsPerPage,
       pageNumber: this.currentPage,
       filter: filters
      }    });
  }  

  getFilters(){
    this.filterMechanism.filters = this.placesService.getFilters()
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

  private checkExist(placeId: number): boolean {
    return this.favoritePlace.favoritesPlaces.some(x => x === placeId);
  }

  getCheckedFilters(){

    let checkedFilters= this.filterMechanism.filters.filter((element, index, array) => {
      return element.selected;
    });

    return checkedFilters;
  }


  getPlaceRating(placeRating: number): any{
    if(placeRating != 0)
    { 
      return placeRating.toString();
    }
    return "";
  }
  getFilteredPlacesList() {
    this.spinnerService.ShowSpinner(Constants.SpinnerComponentConstants.AnimationName);

    this.loading = true;
    this.places = [];

    let checkedFilters = this.getCheckedFilters();

    this.placesService.getFilteredPlaces(checkedFilters, this.cityID, this.currentPage, this.elementsPerPage).subscribe(response => {
      this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);

      response.forEach(element => {
        this.places.push(new Place(element.PlaceId,
          element.Name, element.CityName, element.Description,
          element.PicturePlace,0 , element.PlaceRating)),
          this.cityName = element.CityName
      });
    });
    this.loading = false;
  }

  getFilteredCount() {
    //Show Load Animation
    this.spinnerService.ShowSpinner(Constants.SpinnerComponentConstants.AnimationName);
    this.loading = true;

    let checkedFilters = this.getCheckedFilters();

    this.placesService.getCountFromFilteredPlaces(this.cityID,checkedFilters).subscribe(response => {
      //Hide Load Animation
      this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);

      this.countOfElements = response;
    });

    this.loading = false;
  }

  getStandartParams(){
    this.elementsPerPage = Constants.PaginationConstants.ElementsPerPage;
    this.currentPage = Constants.PaginationConstants.FirstPage;
    this.pagesToShow = Constants.PaginationConstants.PagesToShow;
  }

  goToPage(n: number): void {
    this.currentPage = n;
    this.changeRoutes();
    this.getCheckedFiltersFromUrl();
    this.getFilteredPlacesList();

  }

  onNext(): void {
    this.currentPage++;
    this.changeRoutes();
    this.getCheckedFiltersFromUrl();
    this.getFilteredPlacesList();
  }

  onPrev(): void {
    this.currentPage--;
    this.changeRoutes();
    this.getCheckedFiltersFromUrl();
    this.getFilteredPlacesList();
  }

  showAll(): void{
    this.elementsPerPage = this.countOfElements;
    this.changeRoutes();
    this.getFilteredPlacesList();
  }


  filterTostringArray(): string[]{
    let selectedFilters: string[] = [];

        for(let i=0, lenfilters=this.filterMechanism.filters.length;
                                          i<lenfilters; i++ ){
             if(this.filterMechanism.filters[i].selected){

               selectedFilters.push(this.filterMechanism.filters[i].name);

             }
      }
      return selectedFilters;
  }

  checkSelectedCheckbox(event) {
    this.filterMechanism.filters[event.source.id - 1].selected = event.checked;
    this.currentPage=1;
    this.changeRoutes();
    this.getFilteredCount();
    this.getCheckedFiltersFromUrl();
  }
}
