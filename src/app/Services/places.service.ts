import { Observable } from "rxjs/Observable";
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Inject } from "@angular/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Body } from "@angular/http/src/body";
import { error } from "selenium-webdriver";
import { Place } from "../place";
import { RequestOptions } from "@angular/http/src/base_request_options";
import { HttpParams, HttpClient } from '@angular/common/http';
import { ResponseContentType } from '@angular/http';

@Injectable()
export class PlacesService {

  constructor(private _http: Http) { }

  public getPlaces(cityId: number): any {
    let searchLine = "cityId=" + cityId.toString();
    return this._http.get("http://localhost:51455/api/Place/GetPlacesByCityId")
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || "Server error"));
  }

  public getPlace(placeId: number): any {
    let searchLine = "placeId=" + placeId.toString();
   return this._http.get("http://localhost:51455/api/Place/GetPlaceById",
     { params: searchLine })
     .map((res: Response) => {
       return res.json();
     })
     .catch((error: any) => Observable.throw(error.json().error || "Server error"));
 }

 public getPlacesForCityPageById(cityId: number):any {

  let searchLine = "cityId=" + cityId.toString();

  return this._http.get("http://localhost:51455/api/Place/GetTopPlacesByCityId", {params: searchLine})
  .map((res: Response) => {
    return res.json();
  })
  .catch((error: any) => Observable.throw(error.json().error || "Server error"));

  }
}  


