import { CityService } from './../Services/city.service';
import { Place } from './../place';
import { City } from './../city';
import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PlacesService } from '../Services/places.service';



@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})

export class CityComponent implements OnInit {

  city: City;
  places: Place[] = [];
  cityID: number;


  constructor(private placeService:PlacesService, 
               private cityService:CityService,
               private route: ActivatedRoute,
               private location: Location) {

    this.city = new City(0,"","","");
                }

  ngOnInit() {
    this.cityService.getCity(this.cityID)
                    .subscribe(city => this.city =city);

    this.placeService.getPlaces().subscribe(response => {
      response.forEach(element => {
        this.places.push(new Place(element.PlaceId, 
          element.Name, element.CityName, element.Description, 
          element.PicturePlace));
      });
    });

  }

}
