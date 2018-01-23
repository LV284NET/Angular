import { Observable } from "rxjs/Observable";
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material';
import { errorHandler } from "@angular/platform-browser/src/browser";
import { ErrorHandlingService } from './error-handling.service';

@Injectable()
export class FavoriteService {

    private _urlForAddFavoritePlace: string = "https://localhost:44317/api/Place/AddFavoritePlace";

    constructor(private _http: Http,
        private errorService: ErrorHandlingService,
        private SnackBar: MatSnackBar) {
        }
        
    public AddPlace(placeId: number): any
    {
        this.AddFavoritePlace(placeId).subscribe(response=>{}, error=>{this.errorService.handleError(error)});
    }    

    public AddFavoritePlace(placeId:  number): any
    {
        var headers = new Headers();
        var content = "UserId=" + JSON.parse(localStorage.getItem("currentUser")).id + "&PlaceID="+placeId;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._urlForAddFavoritePlace, content, { headers: headers })
            .map((res: Response) => {
                   return res.json();
                })
            .catch((error: any) => Observable.throw(error));
    }
}
