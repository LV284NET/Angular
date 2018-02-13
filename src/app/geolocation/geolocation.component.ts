import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { GeolocationData } from './../geolocationData';
import { GeolocationService } from '../Services/geolocation.service';

@Component({
  selector: 'app-geolocatuion',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css']
})
export class GeolocationComponent implements OnInit {

  //#region Private Properties

  private latitude: any;

  private longitude: any;

  private currentGeolocationData: GeolocationData;

  private options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };
  
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

  //#endregion

  //#region Constructor
  constructor(
    private http: Http,
    private geolocationService: GeolocationService
  ) {
    this.geolocationService = new GeolocationService(this.http)
    this.currentGeolocationData = new GeolocationData();
  }

  //#endregion

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.successCallback,
        this.errorCallback,
        this.options)
    };
  }
}