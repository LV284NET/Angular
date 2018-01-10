import { Component, OnInit, Input, Inject } from '@angular/core';
import { AuthorizationService } from "../Services/AuthorizationService";
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthorizationService, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {   
  }

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
  }
}
