import { Component, OnInit, Input } from '@angular/core';
import { AuthorizationService } from './Services/AuthorizationService';
import { error } from 'util';
import {User} from "./user";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private authorezeService: AuthorizationService
  ) { }

  user : User;

  @Input() Email: string;
  @Input() Password: string;

  public greeting: string;
  public errorMessage: string;
  
  public onSubmit() {
    alert("onSubmit");
    this.authorezeService.authorize(this.Email, this.Password)
      .subscribe(
      response => {
        this.user = new User(response.Email, response.FirstName, response.LastName);
        this.greeting = response;
      },
      error => {
        this.errorMessage = error;
      }
      )
  }
}