import { Component, OnInit, Input } from '@angular/core';
import { AuthorizationService } from '../Services/AuthorizationService';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { User } from '../user'
import { error } from 'util';

declare var jquery: any;
declare var $: any;

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

  user : User;
  errorMessage = "";


  constructor(private router: Router, private authorezeService: AuthorizationService) { 
    this.user = new User("", "", "", "");
  }

  ngOnInit() {
    this.Email = localStorage.getItem("userAuth");
  }

  register() : void {
    this.authorezeService.register(this.Email, this.Password, this.FirstName, this.LastName)
    .subscribe(
      response => {
      this.user.Guid = response.Guid
      this.router.navigateByUrl("/main");
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

  rememberMe(event) : void {
    if(event.target.checked && this.Email){
      localStorage.setItem("userAuth", this.Email);
    }
    else{
      localStorage.removeItem("userAuth");
    }
  }
}
