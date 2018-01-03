import { error } from "selenium-webdriver";
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CityService {

  private _urlForGetingCityInfo: string = "http://localhost:51455/GetCity";

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

}
