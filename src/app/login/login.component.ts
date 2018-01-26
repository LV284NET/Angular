import { Component, OnInit, Input, Inject } from '@angular/core';
import { AuthorizationService } from '../Services/AuthorizationService';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ErrorHandlingService } from '../Services/error-handling.service';
import { error } from 'util';

import { SpinnerService } from '../Services/spinner.service';
import { Constants } from './../constants';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() Email: string;
  @Input() Password: string;

  public errorMessage: string;

  isRemembered: boolean;

  constructor(private router: Router,
    private authorezeService: AuthorizationService, 
    private errorService: ErrorHandlingService,
    private dialogRef: MatDialogRef<LoginComponent>, 
    private snackBar: MatSnackBar,
    private spinnerService: SpinnerService) { }


  ngOnInit(): void {
    this.Email = localStorage.getItem("userAuth");
    this.isRemembered = this.Email ? true : false;
  }
  closeDialog() {
    this.dialogRef.close();
  }
  rememberMe(event): void {
    if (event.target.checked && this.Email) {
      localStorage.setItem("userAuth", this.Email);
    }
    else {
      localStorage.removeItem("userAuth");
    }
  }

  public onSubmit() {

    this.spinnerService.ShowSpinner(Constants.LoadingAnimation.AnimationName);

    this.authorezeService.confirmUserEmail(this.Email).subscribe(response => {

      this.spinnerService.HideSpinner(Constants.LoadingAnimation.AnimationName);

      this.authorezeService.authorize(this.Email, this.Password).subscribe(response => {
        this.dialogRef.close();
        this.snackBar.open("You are logged in", "Got it", {
          duration: 2000
        });
      }, error => {
        this.errorService.handleError(error);
      }

      );
    }, error => {
      this.errorService.handleError(error);
    })
  };
}