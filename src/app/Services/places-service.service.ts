import { Observable } from "rxjs/Observable";
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Place } from "../place";

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
}
