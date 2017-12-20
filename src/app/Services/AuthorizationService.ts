import { Observable } from "rxjs/Observable";
import { Inject } from "@angular/core";
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Body } from "@angular/http/src/body";
import { error } from "selenium-webdriver";

@Inject("authorizationService")
export class AuthorizationService {

    private _urlForAuthorization: string = "http://localhost:51455/api/user/GetUser";
    private _urlForRegistration: string = "http://localhost:51455/api/user/AddUser";

    constructor(private _http: Http) {
    }

    
    public authorize(mail: string, password: string) 
    {
        var headers = new Headers();
        var cont = JSON.stringify({ Email: mail, Password: password});
        headers.append('Content-Type', 'application/json');
        return this._http.post(this._urlForAuthorization, cont, {headers:headers})
            .map((res:Response) => {
                return res.json();
            })
            .catch((error:any)=>Observable.throw(error.json().error || "Server error"));
            }

    public register(email: string, password: string, firstName: string, lastName : string){
        var headers = new Headers();
        var content = JSON.stringify({Email: email, Password: password, FirstName: firstName, LastName: lastName});
        headers.append('Content-Type', 'application/json');
        return this._http.post(this._urlForRegistration, content, {headers:headers})
        .map((res:Response) => {
            return res.json();
        })
        .catch((error:any)=>Observable.throw(error.json().error || "Server error"));
        }
    }
