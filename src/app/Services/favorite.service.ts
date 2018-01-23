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
//import { RequestOptions } from "@angular/http/src/base_request_options";

@Injectable()
export class FavoriteService {

    private _urlForAddFavoritePlace: string = "https://localhost:44317/api/Place/AddFavoritePlace";
    private _urlForDeleteFavoritePlace: string = "https://localhost:44317/api/Place/DeleteFavoritePlace";
    private _urlForGetFavoritePlaces: string = "https://localhost:44317/api/Profile/GetFavouritePlaces";

    public favouritesPlaces: number[] = [];

    constructor(private _http: Http,
        private errorService: ErrorHandlingService,
        private SnackBar: MatSnackBar) {
            this.getFavouritePlaces().subscribe(response => {
                response.forEach(element => {
                  this.favouritesPlaces.push(element.PlaceId);
                })
        })
    }
        
    public AddPlace(placeId: number): any
    {
        this.AddFavoritePlace(placeId).subscribe(
            response=>{        
            this.favouritesPlaces.push(placeId)},                                      
            error=>{
            this.errorService.handleError(error)});
    }    

    public DeletePlace(placeId: number): any
    {
        this.DeleteFavoritePlace(placeId).subscribe(
            response=>{
            this.favouritesPlaces.splice(this.favouritesPlaces.indexOf(placeId), 1)}, 
            error=>{
            this.errorService.handleError(error)});
    }

    public AddFavoritePlace(placeId: number): any
    {
        var headers = new Headers();
        var content = "UserId=" + JSON.parse(localStorage.getItem("currentUser")).id + "&PlaceID="+placeId;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._urlForAddFavoritePlace, content, { headers: headers })
            .map((res: Response) => {
                   return res;
                })
            .catch((error: any) => Observable.throw(error));
    }

    public DeleteFavoritePlace(placeId: number): any
    {
        var headers = new Headers();
        var content = "UserId=" + JSON.parse(localStorage.getItem("currentUser")).id + "&PlaceId="+placeId;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._urlForDeleteFavoritePlace, content, {headers: headers} )
            .map((res: Response) => {
                   return res;
                })
            .catch((error: any) => Observable.throw(error));
    }

    public getFavouritePlaces(): any
    {
      let searchLine = "id=" + JSON.parse(localStorage.getItem("currentUser")).id;
  
      return this._http.get(this._urlForGetFavoritePlaces, {params: searchLine})
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error));
    }
}
