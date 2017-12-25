import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../Services/places-service.service';
import { Place } from '../place';
import { element } from 'protractor';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  places: Place[] = [];

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.placesService.getPlaces().subscribe(response => {
      response.forEach(element => {
        this.places.push(new Place(element.PlaceId, 
          element.Name, element.CityName, element.Description, 
          this.placesService.getImage(element.PlaceId).
          subscribe(data=> {this.placesService.createImageFromBlob(data)})));
      });
      this.places.forEach(element=> this.placesService.getImage(element.placeId).
      subscribe(data=> {element.picture = this.placesService.createImageFromBlob(data)}))
    });
  }
}
