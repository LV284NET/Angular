import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlacesService } from '../Services/places.service';
import { Place } from '../place';
import { element } from 'protractor';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {


  place: Place;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private placesService: PlacesService,

  ) { 
    this.place = new Place(0, "", "", "", "");
  }

  ngOnInit() {
    this.getPlace();
  }

  getPlace(): any {
    
    const placeId = +this.route.snapshot.paramMap.get('id')

    this.placesService.getPlace(placeId)
      .subscribe(response => {
        this.place = new Place (response.PlaceId, response.Name, 
          response.CityName, response.Description, response.PicturePlace) 
      })
  }
}