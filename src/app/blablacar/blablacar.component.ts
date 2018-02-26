import { BlaBlaCarInfo } from './../blablacarInfo';
import { BlaBlaCarService } from '../Services/bla-bla-car.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { GeolocationData } from './../geolocationData';
import { GeolocationService } from '../Services/geolocation.service';

@Component({
  selector: 'app-blablacar',
  templateUrl: './blablacar.component.html',
  styleUrls: ['./blablacar.component.css']
})
export class BlablacarComponent implements OnInit {

  constructor(private blaBlaCarService: BlaBlaCarService,
    private geolocationService: GeolocationService) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.successCallback,
        this.errorCallback,
        this.options)
    };
  }

  private latitude: any;

  private longitude: any;

  public currentGeolocationData: GeolocationData;

  private options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  }; 
  
  private blablacarErrorMessage: string;
  @Input() currentCityName: string;
  private destinationCityName: string;
  private blablacarInfo: BlaBlaCarInfo;
  private getBlaBlaCarResult: boolean = false;
  private isCurrentCityNameLoaded: boolean = false;
  @Input() travelDate: Date;
  

  private getDateInString(): string {
    if (this.travelDate) {
      return this.travelDate.toDateString();
    }
  }

  private getBlaBlaCarInfo() {
    this.blaBlaCarService.getBlaBlaCarInfo(this.currentCityName, this.destinationCityName, this.getDateInString()).subscribe(
      response => {
        this.getBlaBlaCarResult = true;
        this.blablacarInfo = new BlaBlaCarInfo(response.LowestPrice, response.HighestPrice,
          response.TravelTime, response.Distance, response.CountOfSuggestions, response.Link);
      },
      error => {
        this.blablacarInfo = null;
        this.getBlaBlaCarResult = true;
        this.blablacarErrorMessage = JSON.parse(error._body).Message;
      }
    )
  }

  private getBlaBlaCarTime(TravelTime: number): any {
    let secondInMinute = 60;

    let timeInMinute = TravelTime / secondInMinute;
    if (timeInMinute > secondInMinute) {
      return Math.floor(timeInMinute / secondInMinute) + " h " + timeInMinute % secondInMinute + " m";
    }
  }

  public blaBlaCarFormToggle(toCity: string){
    if (!this.isCurrentCityNameLoaded)
    {
      this.currentCityName = this.currentGeolocationData.GetCityName();
      this.destinationCityName = toCity;
      if (this.currentCityName != null) {
        this.isCurrentCityNameLoaded = true;
        this.getBlaBlaCarInfo();
      }
    }
    else
    {
      this.isCurrentCityNameLoaded = false;
    }
  }

  private errorCallback = (error) => {
    let errorMessage = 'Unknown error';
    switch (error.code) {
      case 1:
        errorMessage = 'Permission denied';
        break;
      case 2:
        errorMessage = 'Position unavailable';
        break;
      case 3:
        errorMessage = 'Timeout';
        break;
    }
    console.log(errorMessage);
  };

  private successCallback = (position) => {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.currentGeolocationData = this.geolocationService
      .GetInfoAboutCurrenLocation(this.latitude, this.longitude);
  }
}