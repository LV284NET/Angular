import { Observable } from 'rxjs/Observable';
import { error } from "selenium-webdriver";
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProfileService {

  private _urlForGetFavoritePlaces: string = "https://localhost:44317/api/Profile/GetFavoritePlaces";
  private _urlForGetUserInfo: string = "https://localhost:44317/api/Profile/GetUserInfo";

  constructor(private _http: Http) { }

  public getUser(userId: number): any
  {
    var headers= new Headers();
    let searchLine = "id=" + userId.toString();
    headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem("currentUser")).token);

    return this._http.get(this._urlForGetUserInfo, {params: searchLine, headers: headers})
    .map((res: Response) => 
    {
      return res.json();
    })
    .catch((error: any) => Observable.throw(error));
  }

  public getFavoritePlaces(userId: number): any
  {
    let searchLine = "id=" + userId;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem("currentUser")).token);

    return this._http.get(this._urlForGetFavoritePlaces, {params: searchLine, headers: headers})
    .map((res: Response) => {
      return res.json();
    })
    .catch((error: any) => Observable.throw(error));
  }
}