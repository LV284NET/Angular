import { Component, OnInit, Input, Inject } from '@angular/core';
import { AuthorizationService } from '../Services/AuthorizationService';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  constructor(private router: Router, private authorezeService: AuthorizationService){}
    //  public dialogRef: MatDialogRef<LoginComponent>){}
  
  ngOnInit(): void {
    this.Email = localStorage.getItem("userAuth");
    this.isRemembered = this.Email ? true : false;
  }
   
  rememberMe(event) : void {
    if(event.target.checked && this.Email){
      localStorage.setItem("userAuth", this.Email);
    }
    else{
      localStorage.removeItem("userAuth");
    }
  } 
  
  public onSubmit() {
    this.authorezeService.authorize(this.Email, this.Password).subscribe(response => {
        if(response == true) {
          let user = localStorage.getItem("currentUser")["username"]; 
          this.errorMessage = "";
        } else {
          this.errorMessage = "No such user!";
        }
        
      }, error => {
        if (error == 404) {
          this.errorMessage = "Email and password doesn't match";
        }

        else {
          this.errorMessage = error.statusText;
        }     
      }
      );   
  }
}