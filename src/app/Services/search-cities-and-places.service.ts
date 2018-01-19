import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class SearchCitiesAndPlacesService {

  url: string;

  constructor(private http : Http) {

    //this.url = 'http://localhost:51455/api/.....SearchCitiesAndPlaces'
    this.url = 'http://localhost:51455/api/GetCities';
   }

  public searchCitiesAndPlaces(input){
    //let searchLine = "input=" + input;
    //return this.http.get(this.url, {params: searchLine})
    return this.http.get(this.url)
    .map((res: Response) => {
      return res.json();
    })
    .catch((error: any) => Observable
      .throw(error));
  }
}
