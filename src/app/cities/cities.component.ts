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
  total = 0;
  page = 1;
  pageSize;
  pagesToShow;

  constructor(
    private cityService:CityService,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService
  ) 
  {
    this.pageSize = Constants.paginationPerPage;
    this.pagesToShow = Constants.paginationPagesToShow;
  }

  ngOnInit() {
    this.getCities();
    this.getCount();
  }

  getCities(): void{
    this.spinnerService.ShowSpinner(Constants.LoadingAnimation.AnimationName);

    this.loading=true;
    this.cities = [];

    this.cityService.getCities(this.page, this.pageSize).subscribe(response => {

      this.spinnerService.HideSpinner(Constants.LoadingAnimation.AnimationName);

      response.forEach(element => {
        this.cities.push(new City(element.Id, 
          element.Name, element.Description, element.PicturePath))
      });
    })
    this.loading=false;
  }

  getCount(){
    this.spinnerService.ShowSpinner(Constants.LoadingAnimation.AnimationName);

    this.loading=true;

    this.cityService.getCitiesCount().subscribe(response => { 

      this.spinnerService.HideSpinner(Constants.LoadingAnimation.AnimationName);

      this.total = response
    });

    this.loading=false;
}


  goToPage(n: number): void {
    this.page = n;
    this.getCities();

  }

  onNext(): void {
    this.page++;
    this.getCities();
  }

  onPrev(): void {
    this.page--;
    this.getCities();
  }

}
