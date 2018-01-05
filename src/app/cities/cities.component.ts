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

  constructor(private cityService:CityService) { }

  ngOnInit() {
    this.getCities();
  }

  getCities(): void{

    this.cityService.getCities().subscribe(response => {
      response.forEach(element => {
        this.cities.push(new City(element.Id, 
          element.Name, element.Description, element.PicturePath))
      });
    })

  }

}
