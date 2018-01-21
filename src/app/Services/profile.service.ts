import { Observable } from 'rxjs/Observable';
import { error } from "selenium-webdriver";
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProfileService {

  constructor(private _http: Http) { }

  public getUserByEmail(): any
  {
    let searchLine = "Email=" + localStorage.getItem("userAuth").toString();

    return this._http.get("http://localhost:51455/api/User/GetUserInfo", {params: searchLine})
    .map((res: Response) => 
    {
      return res.json();
    })
    .catch((error: any) => Observable.throw(error));
  }
}