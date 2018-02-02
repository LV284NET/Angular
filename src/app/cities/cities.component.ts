import { Constants } from './../constants';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CityService } from './../Services/city.service';
import { City } from './../city';
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../Services/spinner.service';
import { RatingService } from '../Services/rating.service';
import { element } from 'protractor';
import { error } from 'util';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  cities: City[] = [];
  loading = false;
  countOfElements = 0;
  currentPage = 1;
  elementsPerPage = 3;
  pagesToShow;

  constructor(
    private cityService:CityService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: SpinnerService,
    private ratingService: RatingService
  ) 

  {
    this.pagesToShow = Constants.PaginationConstants.PagesToShow;
  }

  ngOnInit() {
    this.getPageSizeFromUrl();
    this.getCount();
    this.getPageFromUrl();
    this.getCities();

  }

  getPageFromUrl(){
    let page;

    this.route.queryParams.subscribe(params =>{
      page = +params['pageNumber']
    });

    if(page > 0 )
      {this.currentPage= page;}

    else
      {this.changeRoutes();}
  }

  getPageSizeFromUrl(){
    let pageSize;

    this.route.queryParams.subscribe(params =>{
      pageSize = +params['pageSize']
    });

    if(pageSize > 0)
      {this.elementsPerPage= pageSize;}
    
    else
      {this.changeRoutes();}
  }

  getCities(): void{
    this.spinnerService.ShowSpinner(Constants.SpinnerComponentConstants.AnimationName);

    this.loading=true;
    this.cities = [];

    this.cityService.getCities(this.currentPage, this.elementsPerPage).subscribe(response => {

      this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);

      response.forEach(element => {
        this.cities.push(new City(element.Id, 
          element.Name, element.Description, element.PicturePath, element.CityRating))
      });
    })
    this.loading=false;
  }


  getCount(){
    //Show Load Animation
    this.spinnerService.ShowSpinner(Constants.SpinnerComponentConstants.AnimationName);

    this.loading=true;

    this.cityService.getCitiesCount().subscribe(response => {
      //Hide Load Animation
      this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);
      
      this.countOfElements = response
    });

    this.loading=false;
}

getCityRating(cityRating: number): any{
  if(cityRating != 0)
  { 
    return cityRating.toString();
  }
  return "";
}

changeRoutes(){
  this.router.navigate(['/cities-list'],
    { queryParams: 
      {pageSize: this.elementsPerPage
      , pageNumber: this.currentPage} });
}

  goToPage(n: number): void {
    this.currentPage = n;
    this.changeRoutes();
    this.getCities();
  }

  onNext(): void {
    this.currentPage++;
    this.changeRoutes();
    this.getCities();
  }

  onPrev(): void {
    this.currentPage--;
    this.changeRoutes();
    this.getCities();
  }

}
