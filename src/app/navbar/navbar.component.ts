import { Component, OnInit, Input, Inject } from '@angular/core';
import { AuthorizationService } from "../Services/AuthorizationService";
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthorizationService, private router: Router, public dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {   
  }
  public registerDialogRef: MatDialog
  public loginDialogRef: MatDialog

  signUp() {
    let dialogRef = this.dialog.open(RegisterComponent, {
      width: "500px"
    });

  }

  signIn() {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: "500px"
    });
  }
  logout() {
    this.authService.logout();
    this.snackBar.open("You logged out", "Got it", {
      duration: 2000
    });
  }
   loginClose(){
    this.loginDialogRef.closeAll();
   }
   registerClose(){
     this.registerDialogRef.closeAll();
   }
}
