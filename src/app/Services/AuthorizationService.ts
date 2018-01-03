import { Observable } from "rxjs/Observable";
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthorizationService {

    public token: string;

    private _urlForAuthorization: string = "http://localhost:51455/api/user/GetUser";//"http://localhost:51455/Token";
    private _urlForRegistration: string = "http://localhost:51455/api/Account/Register";

    constructor(private _http: Http) {
         var currentUser = JSON.parse(localStorage.getItem("currentUser"));
         if(currentUser)
            this.token = currentUser.token;
    }
  
    public authorize(email: string, password: string) : Observable<any>
    {
        var headers = new Headers();
        var user = { username: email, scope: email, password: password, grant_type: "password"};
        var content = JSON.stringify(user);
        headers.append('Content-Type', 'application/json');
        return this._http.post(this._urlForAuthorization, content, {headers: headers})
            .map((res:Response) => {
                let token = res.json().access_token;
                if(token) {
                    this.token = token;
                    let user = res.json();
                    localStorage.setItem("currentUser", JSON.stringify({user: {
                        email: user.Email, 
                        firstName: user.FirstName,
                        lastName: user.LastName
                    }, token: token}));
                    return true;
                }
                return false;
            })
            .catch((error:any)=>Observable.throw(error.json().error || "Server error"));
    }

    public register(email: string, password: string, firstName: string, lastName : string, confirmPassword: string): Observable<any>{
        var headers = new Headers();
        var content = JSON.stringify({
            Email: email, 
            Password: password, 
            ConfirmPassword: confirmPassword, 
            FirstName: firstName, 
            LastName: lastName
        });
        headers.append('Content-Type', 'application/json');
        return this._http.post(this._urlForRegistration, content, {headers:headers})
        .map((res:Response) => {
            return this.authorize(email, password);
        })
        .catch((error:any)=>Observable.throw(error.json().error || "Server error"));
        }
        
        logout(): void {
            this.token = null;
            localStorage.removeItem("currentUser");
        }
    }
