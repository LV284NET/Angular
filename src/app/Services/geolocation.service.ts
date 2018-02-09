import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GeolocationData } from './../geolocationData';
import { Constants } from '../constants';

@Injectable()
export class GeolocationService {

  private googleApiUrl = Constants.GeolocationServiceConstants.GoogleApiUrl;

  private apiKey = Constants.GeolocationServiceConstants.ApiKey;

  private currentGeolocationData: GeolocationData = new GeolocationData();

  constructor(private http: Http) {
  }

  public GetInfoAboutCurrenLocation(latitude: any, longitude: any): GeolocationData {
    this.setInfoAboutCurrenLocation(latitude, longitude);
    return this.currentGeolocationData;
  }

  private setInfoAboutCurrenLocation = (latitude, longitude) => {

    this.http.get(this.googleApiUrl + '?key=' + this.apiKey + '&latlng=' +
      latitude + '+' + longitude + '&sensor=true')
      .subscribe(
      response => {
        if (response.status == 200) {
          let data = response.json();
          this.currentGeolocationData.SetCountryName(data.results[0].address_components[6].long_name);
          this.currentGeolocationData.SetRegionName(data.results[0].address_components[5].long_name)
          this.currentGeolocationData.SetCityName(data.results[0].address_components[3].long_name);
          this.currentGeolocationData.SetStreetName(data.results[0].address_components[1].long_name);
          this.currentGeolocationData.SetStreetNumber(data.results[0].address_components[0].long_name)
        }
      },
      error => {
        alert(error.text());
      }
      );
  };
}
