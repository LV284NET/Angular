import { Observable } from "rxjs/Observable";
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Injectable } from "@angular/core";

@Injectable()
export class FavoriteService {

    private _urlForAddFavoritePlace: string = "https://localhost:44317/api/Place/AddFavoritePlace";

    constructor(private _http: Http) {
        }

    public AddFavoritePlace(placeId:  number): Observable<any> 
    {
        var headers = new Headers();
        var content = "UserId=" + JSON.parse(localStorage.getItem("currentUser")).Id + "&PlaceId="+placeId.toString();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._urlForAddFavoritePlace, content, { headers: headers })
            .map((res: Response) => {
                return true;
            })
            .catch((error: any) => Observable.throw(error));
    }
}
