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
// declare var jquery: any;
// declare var $: any;

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

  constructor(private router: Router, private authorezeService: AuthorizationService) { 
    
  }
  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.Email = localStorage.getItem("userAuth");
  }

  register() : void {
    if(this.email.valid && this.password.valid){
      this.authorezeService.register(this.Email, this.Password, this.FirstName, this.LastName)
      .subscribe(response => {
        this.router.navigateByUrl("/main");
      })
    }
  }

  rememberMe(event) : void {
    if(event.target.checked && this.Email){
      localStorage.setItem("userAuth", this.Email);
    }
    else{
      localStorage.removeItem("userAuth");
    }
  }

  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]+@[^ @]+")
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      
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
