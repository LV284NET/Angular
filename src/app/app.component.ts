import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './Services/AuthorizationService';
import { error } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private authorezeService: AuthorizationService
  ) { }

  public login: string;
  public password: string;

  public greeting: string;
  public errorMessage: string;
  
  public onSubmit() {
    alert("onSubmit");
    this.authorezeService.authorize(this.login, this.password)
      .subscribe(
      response => {
        this.greeting = response;
      },
      error => {
        this.errorMessage = error;
      }
      )
  }
}