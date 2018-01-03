import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../Services/places.service';
import { Place } from '../place';


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
          element.PicturePlace));
      });
    });
  }
}
