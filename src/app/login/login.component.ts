import { Component, OnInit, Input } from '@angular/core';
import { AuthorizationService } from '../Services/AuthorizationService';
import { error } from 'util';
import {User} from "../user";
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user : User;

  @Input() Email: string;
  @Input() Password: string;

  public greeting: string;
  public errorMessage: string;

  constructor(private authorezeService: AuthorizationService) {
    this.user = new User("", "", "");

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
    this.authorezeService.authorize(this.Email, this.Password)
      .subscribe(
      response => {
        this.user = new User(response.Email, response.FirstName, response.LastName);
        this.errorMessage = "";
      },
      error => {
        this.errorMessage = "Authorization failed!";
      }
      );

      
  }
}