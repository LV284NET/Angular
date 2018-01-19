import { Observable } from "rxjs/Observable";
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Injectable } from "@angular/core";

@Injectable()
export class FavoriteService {

    private _urlForAddFavoritePlace: string = "http://localhost:51455/api/Profile/AddFavoritePlace";

    constructor(private _http: Http) {
        }

    public AddFavoritePlace(placeId:  number): Observable<any> 
    {
        var headers = new Headers();
        var content = "Email=" + localStorage.getItem("userAuth")+"&placeId="+placeId.toString();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._urlForAddFavoritePlace, content, { headers: headers })
            .map((res: Response) => {
                return true;
            })
            .catch((error: any) => Observable.throw(error));
    }
}
