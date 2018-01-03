import { Observable } from 'rxjs/Observable';
import { error } from "selenium-webdriver";
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CityService {

  private _urlForGetingCityInfo: string = "http://localhost:51455/GetCityByID";
  private _urlForGetingCitiesInfo: string = "http://localhost:51455/GetCities";

  constructor(private _hhtp: Http) { }

  public getCity(cityID: number): any
  {
    var headers = new Headers();
    var cont = JSON.stringify({cityID: cityID});
    headers.append('Content-type','application/json');

    return this._hhtp.post(this._urlForGetingCityInfo, cont, {headers:headers})
      .map((res: Response) => {
        return res.json();
      })
      .catch((error:any) => Observable.throw(error.json || "Server error"))
  }

  public getCities():any {
    return this._hhtp.get(this._urlForGetingCitiesInfo)
    .map((res:Response) => {
      return res.json();
    })
    .catch((error:any) => Observable.throw(error.json().error || "Server error"))
  }


}
 