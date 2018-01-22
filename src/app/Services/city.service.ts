import { Observable } from 'rxjs/Observable';
import { error } from "selenium-webdriver";
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CityService {

  constructor(private _http: Http) { }

  public getCityById(cityId: number): any
  {
    let searchLine = "id=" + cityId.toString();

    return this._http.get("https://localhost:44317/api/GetCity", {params: searchLine})
    .map((res: Response) => {
      return res.json();
    })
    .catch((error: any) => Observable.throw(error.json().error || "Server error"));
  }

  public getCityByName(cityName: string): any
  {
    let searchLine = "cityName=" + cityName;

    return this._http.get("https://localhost:44317/GetCityForCityByName", {params: searchLine})
    .map((res: Response) => {
      return res.json();
    })
    .catch((error: any) => Observable.throw(error.json().error || "Server error"));
  }

  public getCities():any {
    return this._http.get("https://localhost:44317/api/GetCities")
    .map((res:Response) => {
      return res.json();
    })
    .catch((error:any) => Observable.throw(error.json().error || "Server error"))
  }
}
 