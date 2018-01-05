import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlacesService } from '../Services/places.service';
import { Place } from '../place';
import { element } from 'protractor';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {

  places: Place[] = [];

  constructor(private placesService: PlacesService,
    private route: ActivatedRoute,
    private location: Location,
) { 

  }

  ngOnInit() {
    this.getPlaceList();
    
  }

  getPlaceList(){
    const cityId = +this.route.snapshot.paramMap.get('cityId')

    this.placesService.getPlaces(cityId).subscribe(response => {
      response.forEach(element => {
        this.places.push(new Place(element.PlaceId, 
          element.Name, element.CityName, element.Description, 
          element.PicturePlace));
      });
    });
  }

}
