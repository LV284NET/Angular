import { Observable } from "rxjs/Observable";
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Inject } from "@angular/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Body } from "@angular/http/src/body";
import { error } from "selenium-webdriver";
import { Place } from "../place";
import { RequestOptions  } from "@angular/http/src/base_request_options";
import { HttpParams, HttpClient } from '@angular/common/http';
import { ResponseContentType } from '@angular/http';

@Injectable()
export class PlacesService {

  constructor(private _http: Http) { }

  public getPlaces(): any {
    return this._http.get("http://localhost:51455/GetPlaces")
      .map((res:Response) => {
        return res.json();
      })
      .catch((error:any)=>Observable.throw(error.json().error || "Server error"));
  }

  public getImage(PlaceId: number): Observable<File>{
    //let params = new HttpParams();
    let searchLine = "placeId=" + PlaceId.toString();
    return this._http.get("http://localhost:51455/GetImage", 
                      { search: searchLine , responseType: ResponseContentType.Blob })
      .map((res:Response) => {
        return res.blob();
      })
      .catch((error:any)=>Observable.throw(error.json().error || "Server error"));
  }
}
