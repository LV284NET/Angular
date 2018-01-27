import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Constants } from '../constants';

@Injectable()
export class SearchCitiesAndPlacesService {

  private urlForSearchCitiesAndPlaces: string = 
    Constants.SearchCitiesAndPlacesServiceConstants.UrlForSearchCitiesAndPlaces

  constructor(private http : Http) {
    }

  public searchCitiesAndPlaces(input: string){
    let searchLine = "searchWord=" + input;
    return this.http.get(this.urlForSearchCitiesAndPlaces, {params: searchLine})
    .map((res: Response) => {
      return res.json();
    })
    .catch((error: any) => Observable
      .throw(error));
  }
}
