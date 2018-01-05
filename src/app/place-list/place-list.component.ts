import { Component, OnInit } from '@angular/core';
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

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.placesService.getPlaces().subscribe(response => {
      response.forEach(element => {
        this.places.push(new Place(element.PlaceId, 
          element.Name, element.CityName, element.Description, 
          element.PicturePlace));
      });
    });
  }

}
