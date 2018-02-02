import { Constants } from './../constants';
import { Component, OnInit } from '@angular/core';
import { CityService } from './../Services/city.service';
import { City } from './../city';
import { element } from 'protractor';
import { FormControl } from '@angular/forms';
import { SearchCitiesAndPlacesService } from './../Services/search-cities-and-places.service';
import { SearchItem } from './../search-item'
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { MatOptionSelectionChange } from '@angular/material';
import { Router } from '@angular/router';
import { SpinnerService } from '../Services/spinner.service';

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
  inputLine: string;

  constructor(
    private cityService: CityService,
    private router: Router,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit() {
    //Show Load Animation
    this.spinnerService.ShowSpinner(Constants.SpinnerComponentConstants.AnimationName);

    this.cityService.getTopCities().subscribe(response => {
      //Hide Load Animation
      this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);

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
