import { Observable } from "rxjs/Observable";
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthorizationService {

    public token: string;
    public FirstName: string;
    

    private _urlForAuthorization: string = "http://localhost:51455/Token";
    private _urlForRegistration: string = "http://localhost:51455/api/Account/Register";
    private _urlForConfirmEmail: string = "http://localhost:51455/api/Account/Confirm";

    constructor(private _http: Http) {
        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            this.token = currentUser.token;
            this.FirstName = currentUser.firstName;
        }
            
    }

    public confirmUserEmail(email: string): Observable<boolean> {
        var headers = new Headers();
        var content = "email=" + email;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._urlForConfirmEmail, content, { headers: headers })
            .map((res: Response) => {
                return true;
            })
            .catch((error: any) => Observable.throw(error));
    }


    public authorize(email: string, password: string): Observable<any> {
        var headers = new Headers();
        var content = "grant_type=password&username=" + email + "&password=" + password;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._urlForAuthorization, content, { headers: headers })
            .map((res: Response) => {
                let token = res.json().access_token;
                if (token) {
                    this.token = token;
                    let userName = res.json().userName;
                    let firstName = res.json().firstName;   
                    localStorage.setItem("currentUser", JSON.stringify({ username: userName, firstName: firstName, token: token }));
                    this.FirstName = firstName;
                    return true;
                }
                return false;
            })
            .catch((error: any) => Observable.throw(error));
    }

    public register(email: string, password: string, firstName: string, lastName: string,
        confirmPassword: string): Observable<any> {
        var headers = new Headers();
        var content = "Email=" + email + "&Password=" + password + "&ConfirmPassword=" + confirmPassword
            + "&FirstName=" + firstName + "&LastName=" + lastName;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._urlForRegistration, content, { headers: headers })
            .map((res: Response) => {
                return this.authorize(email, password);
            })
            .catch((error: any) => Observable.throw(error));
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem("currentUser");
    }
}
