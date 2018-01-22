import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class SearchCitiesAndPlacesService {

  url: string;

  constructor(private http : Http) {

    this.url = 'https://localhost:44317/api/Search/GetSuggestions'
    }

  public searchCitiesAndPlaces(input: string){
    let searchLine = "searchWord=" + input;
    return this.http.get(this.url, {params: searchLine})
    .map((res: Response) => {
      return res.json();
    })
    .catch((error: any) => Observable
      .throw(error));
  }
}
