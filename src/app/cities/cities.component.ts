import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CityService } from './../Services/city.service';
import { City } from './../city';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  cities: City[] = [];

  constructor(private cityService:CityService,
              private route: ActivatedRoute,) { }

  ngOnInit() {
    this.getCities();
  }

  getCities(): void{
    const pageNumber = +this.route.snapshot.paramMap.get('pageNumber');

    this.cityService.getCities(pageNumber).subscribe(response => {
      response.forEach(element => {
        this.cities.push(new City(element.Id, 
          element.Name, element.Description, element.PicturePath))
      });
    })

  }

}
