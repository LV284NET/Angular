import { Observable } from "rxjs/Observable";
import { Http, Headers, Response, URLSearchParams, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material';
import { errorHandler } from "@angular/platform-browser/src/browser";
import { ErrorHandlingService } from './error-handling.service';
import { forEach } from "@angular/router/src/utils/collection";
import { Constants } from '../constants';
@Injectable()
export class RatingService {

  private urlForGetCityRating = Constants.RatingServiceConstants.UrlForGetCityRating;
  private urlForGetPlaceRating = Constants.RatingServiceConstants.UrlForGetPlaceRating;
  private urlForGerUserRatingOfPlace = Constants.RatingServiceConstants.UrlForGetUserRatingOfPlace;
  private urlForSetUserRatingofPlace = Constants.RatingServiceConstants.UrlForSetUserRatingOfPlace;

  constructor(private _http: Http,
              private errorService: ErrorHandlingService,
              private SnackBar: MatSnackBar) { }

              public getCityPating(cityId: number): any
              {
                var headers = new Headers();
                headers.append('Content-Type', 'application/json');
                let searchLine = "CityId=" + cityId;
          
                return this._http.get(this.urlForGetCityRating, {params: searchLine, headers: headers})
                .map((res: Response) => {
                  return res.json();
                })
                .catch((error: any) => Observable.throw(error));
              }

              public getPlacePating(placeId: number): any
              {
                var headers = new Headers();
                headers.append('Content-Type', 'application/json');
                let searchLine = "PlaceId=" + placeId;
          
                return this._http.get(this.urlForGetPlaceRating, {params: searchLine, headers: headers})
                .map((res: Response) => {
                  return res.json();
                })
                .catch((error: any) => Observable.throw(error));
              }

              public getUserRatingOfPlace(placeId: number): any
              {
                var headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem("currentUser")).token);  

                let searchLine = "UserId" + JSON.parse(localStorage.getItem("currentUser")).id + 
                "&PlaceId=" + placeId;

                return this._http.get(this.urlForGerUserRatingOfPlace, {params: searchLine, headers: headers})
                .map((res: Response) => {
                  return res.json();
                })
                .catch((error: any) => Observable.throw(error));
              }

              public SerUserRatingOfPlace(placeId: number): any
              {
                  var headers = new Headers();
                  headers.append('Content-Type', 'application/json');
                  headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem("currentUser")).token);

                  var body = JSON.stringify(
                    {"UserId": JSON.parse(localStorage.getItem("currentUser")).id, 
                    "PlaceId" : placeId}
                  );

                  return this._http.post(this.urlForSetUserRatingofPlace, body, 
                      { headers: headers })
                      .map((res: Response) => {
                             return res;
                          })
                      .catch((error: any) => Observable.throw(error));
              }
}
