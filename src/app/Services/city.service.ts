import { Observable } from 'rxjs/Observable';
import { error } from "selenium-webdriver";
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constants } from '../constants';

@Injectable()
export class CityService {

  private urlForGetCityById: string = Constants.CityServiceConstants.UrlForGetCityById;
  private urlForGetCities: string = Constants.CityServiceConstants.UrlForGetCities;
  private urlForGetCitiesCount: string = Constants.CityServiceConstants.UrlForGetCitiesCount;
  private urlForGetTopCities: string = Constants.CityServiceConstants.UrlForGetTopCities;

  constructor(private _http: Http) { }

  public getCityById(cityId: number): any
  {
    let searchLine = "id=" + cityId.toString();

    return this._http.get(this.urlForGetCityById, {params: searchLine})
    .map((res: Response) => {
      return res.json();
    })
    .catch((error: any) => Observable.throw(error.json().error || "Server error"));
  }

  public getCities(pageNumber: number, pageSize:number):any {
    let searchLine = "page=" + pageNumber;
    searchLine += "&pageSize=" + pageSize.toString();

    return this._http.get(this.urlForGetCities, {params: searchLine})
    .map((res:Response) => {
      return res.json();
    })
    .catch((error:any) => Observable.throw(error))
  }

  public getTopCities():any {

    return this._http.get(this.urlForGetTopCities)
    .map((res:Response) => {
      return res.json();
    })
    .catch((error:any) => Observable.throw(error))
  }

  public getCitiesCount():any {
    return this._http.get(this.urlForGetCitiesCount)
    .map((res: Response) => {
      return res.json();
    })
    .catch((error:any) => Observable.throw(error))
  }
}
 