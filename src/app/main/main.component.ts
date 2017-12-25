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
  imagesToShow: any[] = [];
  isImageLoading: boolean;
  
  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.placesService.getPlaces().subscribe(response => {
      response.forEach(element => {
        this.places.push(new Place(element.PlaceId, 
          element.Name, element.CityName, element.Description, 
          this.getImageFromService(element.PlaceId)));
      });
    });
  }

  getImageFromService(PlaceId: number) {
    this.isImageLoading = true;
    this.placesService.getImage(PlaceId).subscribe(data => {
      this.createImageFromBlob(data, PlaceId);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob, PlaceId: number): any {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imagesToShow[PlaceId] = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
  }
}
