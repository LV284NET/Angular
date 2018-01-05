import { CityService } from './../Services/city.service';
import { Place } from './../place';
import { City } from './../city';
import { Component, OnInit, Input } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PlacesService } from '../Services/places.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})

export class CityComponent implements OnInit {

  city: City;
  places: Place[] = [];


  constructor(private placeService:PlacesService, 
               private cityService:CityService,
               private route: ActivatedRoute,
               private location: Location
              ) {}

  ngOnInit() {

    this.getCity();
    this.getPlaces();

  }

  getCity(){

    const id = +this.route.snapshot.paramMap.get('cityId');

    this.cityService.getCityById(id)
        .subscribe(response => {
          this.city = new City (response.Id, response.Name, 
            response.Description, response.PicturePath)
        });
  }

  getPlaces(){
    const id = +this.route.snapshot.paramMap.get('cityId');

    this.placeService.getPlacesForCityPageById(id)
        .subscribe(response => {
          response.forEach(element => {
            this.places.push(new Place(element.PlaceId, 
              element.Name, element.CityName, element.Description, 
              element.PicturePlace));
          });
        });


  }

  goBack(): void{
    this.location.back();
  }

}
