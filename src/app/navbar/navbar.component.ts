import { Component, OnInit, Input, Inject } from '@angular/core';
import { AuthorizationService } from "../Services/AuthorizationService";
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
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
  public registerDialogRef: MatDialog;
  public loginDialogRef: MatDialog;
  public userName: string;

  signUp() {
    let dialog = this.dialog.closeAll()
    let dialogRef = this.dialog.open(RegisterComponent, {
      width: "500px"
      
    });
  }

  signIn() {
    let dialog = this.dialog.closeAll();
    let dialogRef = this.dialog.open(LoginComponent, {
      width: "500px"
    });
  }

  logout() {
    JSON.parse(localStorage.getItem("currentUser")).Id;
    this.authService.logout();
    this.snackBar.open("You logged out", "Got it", {
      duration: 2000
    });
  }

  profile() {
      let userId=JSON.parse(localStorage.getItem("currentUser")).id;
      this.router.navigateByUrl("/"+userId);
  }
}
