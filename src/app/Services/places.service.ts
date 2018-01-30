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
import { Constants } from '../constants';

@Injectable()
export class PlacesService {

  private urlForGetPlaces: string = Constants.PlacesServiceConstants.UrlForGetPlaces;
  private urlForGetFilteredPlaces: string = Constants.PlacesServiceConstants.UrlForGetFilteredPlaces;
  private urlForGetPlace: string = Constants.PlacesServiceConstants.UrlForGetPlace;
  private urlForGetTopPlacesByCityId: string = Constants.PlacesServiceConstants.UrlForGetTopPlacesByCityId;
  private urlForGetPlacesCount: string = Constants.PlacesServiceConstants.UrlForGetPlacesCount;

  constructor(private _http: Http) { }

  public getPlaces(cityId: number, pageNumber: number, pageSize: number): any {

    let searchLine = "cityId=" + cityId.toString();
    searchLine += "&page=" + pageNumber.toString();
    searchLine += "&pageSize=" + pageSize.toString();

    return this._http
      .get(this.urlForGetPlaces, { params: searchLine })
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable
        .throw(error.json().error || "Server error"));
  }

  public getFilteredPlaces(checkedFilters: any[], cityId: number, pageNumber: number, pageSize: number): any {
    let searchLine = "cityId=" + cityId.toString();
    searchLine += "&page=" + pageNumber.toString();
    searchLine += "&pageSize=" + pageSize.toString();
    checkedFilters.forEach((element, index, array) => {
      searchLine += "&filters=" + element.name;
    });

    return this._http
      .get(this.urlForGetFilteredPlaces, { params: searchLine })
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable
        .throw(error.json().error || "Server error"));
  }

  public getPlace(placeId: number): any {
    let searchLine = "placeId=" + placeId.toString();
    return this._http
      .get(this.urlForGetPlace, { params: searchLine })
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable
        .throw(error.json().error || "Server error"));
  }

  public getTopPlacesByCityId(cityId: number): any {

    let searchLine = "cityId=" + cityId.toString();

    return this._http
      .get(this.urlForGetTopPlacesByCityId, { params: searchLine })
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable
        .throw(error.json().error || "Server error"));
  }

  public getPlacesCount(cityId: number): any {

    let searchLine = "cityId=" + cityId.toString();

    return this._http
      .get(this.urlForGetPlacesCount,
      { params: searchLine })
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable
        .throw(error));
  }
}  