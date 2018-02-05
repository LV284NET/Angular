import { Observable } from "rxjs/Observable";
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Injectable } from "@angular/core";
import { Constants } from '../../constants';


@Injectable()
export class FacebookAuthService {

    private urlForSocialAuth: string = Constants.SocialAuthConstants.UrlForSocialAuth;
    private facebookAccessToken: any;
    private data: any;

    constructor(private _http: Http) {

    }
    public facebookLogin( data): Observable<boolean> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var content = data;
        return this._http.post(this.urlForSocialAuth, content, { headers: headers })
            .map((res: Response) => {
                return true;
            })
            .catch((error: any) => Observable.throw(error));

    }

}
