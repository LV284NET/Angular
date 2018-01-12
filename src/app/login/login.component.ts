import { Component, OnInit, Input, Inject } from '@angular/core';
import { AuthorizationService } from '../Services/AuthorizationService';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ErrorHandlingService } from '../Services/error-handling.service';

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
    private authorezeService: AuthorizationService, private errorService: ErrorHandlingService,
    private dialogRef: MatDialogRef<LoginComponent>, private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.Email = localStorage.getItem("userAuth");
    this.isRemembered = this.Email ? true : false;
  }
  closeDialog(){
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
    this.authorezeService.authorize(this.Email, this.Password).subscribe(response => {
      let user = localStorage.getItem("currentUser")["username"];
      this.errorMessage = "You are signed in!";
      this.dialogRef.close();
      this.snackBar.open(this.errorMessage, "Got it", {
        duration: 2000
      });
    }, error => {
      this.errorService.handleError(error);
      // if (error == 404) {
      //   this.errorMessage = "Email and password doesn't match";
      // }
      // else {
      //   this.errorMessage = error.statusText;
      // }
      // this.snackBar.open(this.errorMessage, "Got it");
    }
    );
  }
}