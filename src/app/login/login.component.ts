import { Component, OnInit, Input } from '@angular/core';
import { AuthorizationService } from '../Services/AuthorizationService';
import { error } from 'util';
import {User} from "../user";

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
    this.user = new User("", "", "", "");
   }

  public onSubmit() {
    this.authorezeService.authorize(this.Email, this.Password)
      .subscribe(
      response => {
        this.user = new User(response.Email, response.FirstName, response.LastName, response.Guid);
        this.errorMessage = "";
      },
      error => {
        if (error.StatusMessage = 404) {
          this.errorMessage = "Email and password doesn't mutch";
        }
        
        else {
          this.errorMessage = "Authorization failed!";
        }
      }
      );
  }
}