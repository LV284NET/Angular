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
  elementsPerPage;
  pagesToShow;

  constructor(
    private cityService:CityService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: SpinnerService,
    private ratingService: RatingService
  ) 

  {
    this.elementsPerPage = Constants.PaginationConstants.ElementsPerPage;
    this.pagesToShow = Constants.PaginationConstants.PagesToShow;
  }

  ngOnInit() {
    this.getPageFromUrl();
    this.getCities();
    this.getCitiesRating();
    this.getCount();
  }

  getPageFromUrl(){
    const pageNumber = +this.route.snapshot.paramMap.get('pageNumber');
    this.currentPage = pageNumber;
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

  getCitiesRating(): void{
    this.cities.forEach( element => 
      {
        this.ratingService.getCityPating(element.cityID).subscribe(
          response => {element.rating = response},
          error => {element.rating = 0}
        )
      }
    )
  }

  getCityRating(cityRating: number): any{
    if(cityRating != 0)
    { 
      return cityRating.toString();
    }
    return "";
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

  goToPage(n: number): void {
    this.currentPage = n;
    this.router.navigate(['/cities-list/page/'+this.currentPage]);
    this.getCities();
    this.getCitiesRating();
  }

  onNext(): void {
    this.currentPage++;
    this.router.navigate(['/cities-list/page/'+this.currentPage]);
    this.getCities();
  }

  onPrev(): void {
    this.currentPage--;
    this.router.navigate(['/cities-list/page/'+this.currentPage]);
    this.getCities();
  }

}
