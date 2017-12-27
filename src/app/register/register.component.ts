import { Component, OnInit, Input } from '@angular/core';
import { AuthorizationService } from '../Services/AuthorizationService';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgModule,Pipe } from '@angular/core';
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() Email : string;
  @Input() Password: string;
  @Input() FirstName: string;
  @Input() LastName: string;
  
  myform: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;

  errorMessage: string;

  constructor(private router: Router, private authorezeService: AuthorizationService) { 
  }
  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }
  //Should be fixed
  register() : void {
    this.authorezeService.register(this.Email, this.Password, this.FirstName, this.LastName)
    .subscribe(
      response => {
        if(response) {
          this.router.navigateByUrl("/main");
        }
        else {
          this.errorMessage = "Register error!"
        }     
    },
    error => {
      if (error.StatusMessage = 400) {
        this.errorMessage = "There is a user with the same e-mail!";
      }
      else {
        this.errorMessage = "Registration failed!";
      }
    }
  );
  }
  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.pattern('((?=.*[A-Z]).{8,20})'),
      Validators.minLength(8)
    ]);
  }
  createForm() {
    this.myform = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    });
  }
}
