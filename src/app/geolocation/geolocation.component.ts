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

  public latitude: any;

  public longitude: any;

  public currentGeolocationData: GeolocationData = new GeolocationData();

  constructor(
    private http: Http,
    private geolocationService: GeolocationService
  ) {
    this.geolocationService = new GeolocationService(this.http)
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.successCallback,
        this.errorCallback,
        this.options)
    };
  }

  private successCallback = (position) => {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.currentGeolocationData = this.geolocationService
      .GetInfoAboutCurrenLocation(this.latitude, this.longitude);
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

  private options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };  
}



