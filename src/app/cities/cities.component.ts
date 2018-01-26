import { Constants } from './../constants';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CityService } from './../Services/city.service';
import { City } from './../city';
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../Services/spinner.service';

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
    private spinnerService: SpinnerService
  ) 
  {
    this.elementsPerPage = Constants.ElementsPerPage;
    this.pagesToShow = Constants.PagesToShow;
  }

  ngOnInit() {
    this.getCities();
    this.getCount();
  }

  getCities(): void{
    this.spinnerService.ShowSpinner(Constants.LoadingAnimation.AnimationName);

    this.loading=true;
    this.cities = [];

    this.cityService.getCities(this.currentPage, this.elementsPerPage).subscribe(response => {

      this.spinnerService.HideSpinner(Constants.LoadingAnimation.AnimationName);

      response.forEach(element => {
        this.cities.push(new City(element.Id, 
          element.Name, element.Description, element.PicturePath))
      });
    })
    this.loading=false;
  }

  getCount(){
    //Show Load Animation
    this.spinnerService.ShowSpinner(Constants.LoadingAnimation.AnimationName);

    this.loading=true;

    this.cityService.getCitiesCount().subscribe(response => {
      //Hide Load Animation
      this.spinnerService.HideSpinner(Constants.LoadingAnimation.AnimationName);
      
      this.countOfElements = response
    });

    this.loading=false;
}

  goToPage(n: number): void {
    this.currentPage = n;
    this.getCities();

  }

  onNext(): void {
    this.currentPage++;
    this.getCities();
  }

  onPrev(): void {
    this.currentPage--;
    this.getCities();
  }

}
