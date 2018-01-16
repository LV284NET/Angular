import { Component, OnInit } from '@angular/core';
// import { PlacesService } from '../Services/places.service';
import { CityService } from './../Services/city.service';
//import { Place } from '../place';
import { City } from './../city';
import { element } from 'protractor';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  cities: City[] = [];
  imageURL: string [] = [];
  names: string [] = [];
  
  constructor(private cityService: CityService) { }

  ngOnInit() {
    this.cityService.getCities().subscribe(response => {
      response.forEach(element => {
        this.cities.push(new City(element.Id, 
          element.Name, element.Description, 
          element.PicturePath));
        this.imageURL.push(element.PicturePath);
        this.names.push(element.Name)
      });
    });
  }
}
