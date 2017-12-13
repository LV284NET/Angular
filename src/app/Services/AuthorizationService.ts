import { Observable } from "rxjs/Observable";
import { Inject } from "@angular/core";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Inject("authorizationService")
export class AuthorizationService {

    private baseUrl: string = "api/authorize/";

    constructor(private _http: Http) {
    }

    public authorize(login: string, password: string): Observable<string> {
        return this._http.post(this.baseUrl, { login: login, password: password })
            .map((res: Response) => {
                return res.json() as string
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}