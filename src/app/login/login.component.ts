import { Component, OnInit, Input, Inject } from '@angular/core';
import { AuthorizationService } from '../Services/AuthorizationService';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ErrorHandlingService } from '../Services/error-handling.service';
import { error } from 'util';
import { SpinnerService } from '../Services/spinner.service';
import { TokenExpiredService } from '../Services/token-expired.service';
import { Constants } from './../constants';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //#region Inputs

  @Input() Email: string;

  @Input() Password: string;

  //#endregion

  //#region Public Properties

  public errorMessage: string;

  public isRemembered: boolean;

  //#endregion

  //#region Constructor

  constructor(
    private authorezeService: AuthorizationService,
    private errorService: ErrorHandlingService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private snackBar: MatSnackBar,
    private tokenService: TokenExpiredService,
    private spinnerService: SpinnerService) { }

  //#endregion

  ngOnInit(): void {
    this.Email = localStorage.getItem("userAuth");
    this.isRemembered = this.Email ? true : false;
  }

  //#region Private Methods

  private closeDialog() {
    this.dialogRef.close();
  }

  private rememberMe(event): void {
    if (event.target.checked && this.Email) {
      localStorage.setItem("userAuth", this.Email);
    }
    else {
      localStorage.removeItem("userAuth");
    }
  }

  private onFacebookLogin() {
    FB.login((r) => {
      FB.getLoginStatus(response => {
        if (response.status === 'connected') {
          FB.api('/me?fields=email,first_name,last_name', (data) => {
            this.authorezeService.facebookLogin(data).subscribe(response => {
              this.dialogRef.close();
              this.tokenService.checkToken();
              this.snackBar.open("You are logged in", "Got it", {
                duration: 2000
              });
            });
          });
        }
        else if (response.status === 'not_authorized') {
          this.snackBar.open("Something went wrong, try again", "Got it", {
            duration: 2000
          });
        } else {

        }
      });
    }, {
        scope: 'email'
      });
  }

  private statusChangeCallback(response) {};

  private onSubmit() {
    //Show Loading Animation
    this.spinnerService.ShowSpinner(Constants.SpinnerComponentConstants.AnimationName);

    this.authorezeService.confirmUserEmail(this.Email).subscribe(response => {

      //Hide Loading Animation
      this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);

      this.authorezeService.authorize(this.Email, this.Password).subscribe(response => {
        this.dialogRef.close();
        this.tokenService.checkToken();
        this.snackBar.open("You are logged in", "Got it", {
          duration: 2000
        });
      }, error => {
        this.errorService.handleError(error);

        //Hide Loading Animation
        this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);
      }

      );
    }, error => {
      this.errorService.handleError(error);

      //Hide Loading Animation
      this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);
    })
  };

  //#endregion
}