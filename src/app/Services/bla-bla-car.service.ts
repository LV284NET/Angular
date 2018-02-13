import { Constants } from '../constants';
import { Observable } from 'rxjs/Observable';
import { error } from "selenium-webdriver";
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class BlaBlaCarService {


  constructor(private _http: Http) { }

  public getBlaBlaCarInfo(fromCity: string, toCity: string, tripDate?: string): any
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let searchLine =  "fromCity=" + fromCity + "&toCity=" + toCity;
    if (tripDate != null)
      searchLine += "&dateOfTrip=" + tripDate;
    
    return this._http.get(Constants.BlaBlaCarService.UrlForApiBlaBlaCar, {params: searchLine, headers: headers})
    .map((res: Response) => {
      return res.json();
    })
    .catch((error: any) => Observable.throw(error || "Server error"));
  }
}
