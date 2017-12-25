import {Component, OnInit, Input } from '@angular/core';
import { AuthorizationService } from '../Services/AuthorizationService';
import { error } from 'util';
import {User} from "../user";
import { errorHandler } from '@angular/platform-browser/src/browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : User;

  @Input() Email: string;
  @Input() Password: string;

  public greeting: string;
  public errorMessage: string;

  constructor(private router: Router, private authorezeService: AuthorizationService) {
    this.user = new User("", "", "", "");
  }
  
  ngOnInit(): void {
    this.Email = localStorage.getItem("userAuth");
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
        this.user = new User(response.Email, response.FirstName, response.LastName, response.Guid);
        this.errorMessage = "";
        this.router.navigateByUrl("/main");
      },
      error => {
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