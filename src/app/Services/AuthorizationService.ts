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
    public UserId: any;
    

    private _urlForAuthorization: string = "https://localhost:44317/Token";
    private _urlForRegistration: string = "https://localhost:44317/api/Account/Register";
    private _urlForConfirmEmail: string = "https://localhost:44317/api/Account/Confirm";
    private _urlForChangePassword : string = "https://localhost:44317/api/Account/ChangePassword";

    constructor(private _http: Http) {
        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            this.token = currentUser.token;
            this.FirstName = currentUser.firstName;
            this.UserId = currentUser.Id;
        }
            
    }

    public changePassword(oldPassword: string, newPassword: string, newPasswordConfirm: string): Observable<boolean> {
        var headers = new Headers();

        var body=
        {
            "OldPassword": oldPassword,
            "NewPassword": newPassword,
            "ConfirmPassword": newPasswordConfirm
        }
            
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.token);
        return this._http.post(this._urlForChangePassword, JSON.stringify(body), { headers: headers })
            .map((res: Response) => {
                return true;
            })
            .catch((error: any) => Observable.throw(error));
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
                    let Id = res.json().Id;
                    localStorage.setItem("currentUser", JSON.stringify({ id: Id, username: userName, firstName: firstName, token: token }));
                    this.FirstName = firstName;
                    this.UserId = Id; 
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
