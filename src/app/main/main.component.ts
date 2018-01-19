import { Component, OnInit } from '@angular/core';
import { CityService } from './../Services/city.service';
import { City } from './../city';
import { element } from 'protractor';
import { FormControl } from '@angular/forms';
import { SearchCitiesAndPlacesService } from './../Services/search-cities-and-places.service';
import { SearchItem } from './../search-item'
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [SearchCitiesAndPlacesService]
})
export class MainComponent implements OnInit {

  cities: City[] = [];
  imageURL: string[] = [];
  names: string[] = [];
  searchResult: SearchItem[] = [];
  formInput: FormControl = new FormControl();

  constructor(private cityService: CityService,
    private searchService: SearchCitiesAndPlacesService) { }

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

    this.formInput.valueChanges
      .debounceTime(400)
      .subscribe(input => {
        this.searchResult.length = 0;
        this.searchService.searchCitiesAndPlaces(input).subscribe(response => {
          response.forEach(element => {
            this.searchResult.push(new SearchItem(
              element.Id,
              0,
              element.Name,
              'city'));
          });
        });
      })
  }
}
