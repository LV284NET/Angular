import { Observable } from "rxjs/Observable";
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Injectable } from "@angular/core";
import { Constants } from '../constants';

@Injectable()
export class AuthorizationService {

    private urlForAuthorization: string = Constants.AuthorizationServiceConstants.UrlForAuthorization;
    private urlForRegistration: string = Constants.AuthorizationServiceConstants.UrlForRegistration;
    private urlForConfirmEmail: string = Constants.AuthorizationServiceConstants.UrlForConfirmEmail;
    private urlForChangePassword: string = Constants.AuthorizationServiceConstants.UrlForChangePassword;
    private urlForSocialAuth: string = Constants.SocialAuthConstants.UrlForSocialAuth;
    private facebookProviderName: string = Constants.SocialAuthConstants.FacebookProvinerName;
    private urlForChangeFirstName: string = Constants.AuthorizationServiceConstants.UrlForChangeFirstName;
    private urlForChangeLastName: string = Constants.AuthorizationServiceConstants.UrlForChangeLastName;

    public token: string;
   // public facebookAccessToken: string;
    public FirstName: string;
    public UserId: any;

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

        var body =
            {
                "OldPassword": oldPassword,
                "NewPassword": newPassword,
                "ConfirmPassword": newPasswordConfirm
            }

        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.token);
        return this._http.post(this.urlForChangePassword, JSON.stringify(body), { headers: headers })
            .map((res: Response) => {
                return true;
            })
            .catch((error: any) => Observable.throw(error));
    }

    public changeFirstName(newFirstName: string): Observable<boolean> {
        var headers = new Headers();

        var body =
            {
                "newFirstName": newFirstName
            }

        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.token);
        return this._http.post(this.urlForChangeFirstName, JSON.stringify(body), { headers: headers })
            .map((res: Response) => {
                return true;
            })
            .catch((error: any) => Observable.throw(error));
    }

    public changeLastName(newLastName: string): Observable<boolean> {
        var headers = new Headers();

        var body =
            {
                "newLastName": newLastName
            }

        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.token);
        return this._http.post(this.urlForChangeLastName, JSON.stringify(body), { headers: headers })
            .map((res: Response) => {
                return true;
            })
            .catch((error: any) => Observable.throw(error));
    }

    public confirmUserEmail(email: string): Observable<boolean> {
        var headers = new Headers();
        var content = "email=" + email;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.urlForConfirmEmail, content, { headers: headers })
            .map((res: Response) => {
                return true;
            })
            .catch((error: any) => Observable.throw(error));
    }


    public authorize(email: string, password: string): Observable<any> {
        var headers = new Headers();
        var content = "grant_type=password&username=" + email + "&password=" + password;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.urlForAuthorization, content, { headers: headers })
            .map((res: Response) => {
                let token = res.json().access_token;
                if (token) {
                    this.token = token;
                    let userName = res.json().userName;
                    let firstName = res.json().firstName;
                    let Id = res.json().Id;
                    var dateNow = Date.now();
                    let tokenExpired = res.json().expires_in;
                    var tokenDurating = dateNow + tokenExpired * 1000;
                    localStorage.setItem("currentUser", JSON.stringify({ id: Id, username: userName, firstName: firstName, tokenDurating: tokenDurating, token: token }));
                    this.FirstName = firstName;
                    this.UserId = Id;
                    return true;
                }
                return false;
            })
            .catch((error: any) => Observable.throw(error));
    }

    public facebookLogin(facebookAccessToken): Observable<boolean> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var content = "accesstoken=" + facebookAccessToken + "&provider=" + this.facebookProviderName;
        return this._http.post(this.urlForSocialAuth, content, { headers: headers })
            .map((res: Response) => {
                let token = res.json().access_token;
                if (token) {
                    this.token = token;
                    let userName = res.json().userName;
                    let firstName = res.json().firstName;
                    let Id = res.json().id;
                    var dateNow = Date.now();
                    let tokenExpired = res.json().expires_in;
                    var tokenDurating = dateNow + tokenExpired * 1000;
                    localStorage.setItem("currentUser", JSON.stringify({ id: Id, username: userName, firstName: firstName, tokenDurating: tokenDurating, token: token }));
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
        return this._http.post(this.urlForRegistration, content, { headers: headers })
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
