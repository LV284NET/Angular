import { Component, OnChanges, Input } from '@angular/core';

import { WeatherService } from '../Services/weather.service';
import { City } from '../city';
import { Weather } from './weather.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnChanges {

  @Input()
  public city: City;
  public myWeather: WeatherService;
  public currentWeather: Weather;
  
  constructor(
    public weatherService: WeatherService
  ) { }

  ngOnChanges() {
    this.weatherService.getWeatherByCity(this.city.name)
      .subscribe(data => this.currentWeather = data); 

      
  }

}
