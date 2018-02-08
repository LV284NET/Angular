import { Component, OnInit, Input } from '@angular/core';
import { AuthorizationService } from '../Services/AuthorizationService';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgModule, Pipe } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { User } from '../user';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import 'rxjs/add/Observable/throw';
import { ErrorHandlingService } from '../Services/error-handling.service';
import { SpinnerService } from '../Services/spinner.service';
import { Constants } from './../constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() Email: string;
  @Input() Password: string;
  @Input() FirstName: string;
  @Input() LastName: string;
  @Input() ConfirmPassword: string;

  myform: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  private namePattern: string = Constants.DataValidationConstants.NamePattern;
  private passwordPattern: string = Constants.DataValidationConstants.PasswordPattern;
  private emailPattern: string = Constants.DataValidationConstants.EmailPattern;

  errorMessage: string;

  constructor(
    private authorezeService: AuthorizationService, 
    private errorService: ErrorHandlingService,
    private dialogRef: MatDialogRef<RegisterComponent>, 
    private snackBar: MatSnackBar,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  register(): void {
    //Show Loading Animation
    this.spinnerService.ShowSpinner(Constants.SpinnerComponentConstants.AnimationName);
    
    this.authorezeService.register(this.Email, this.Password, this.FirstName, this.LastName, this.ConfirmPassword)
      .subscribe(
      response => {

        //Hide Loading Animation
        this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);

        this.snackBar.open("You are registered! Check your email", "Got it", {
          duration: 2000
        });
        this.dialogRef.close();
      },
      error => {
        this.errorService.handleError(error);

        //Hide Loading Animation
        this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);
      }
      );
  }
  closeDialog() {
    this.dialogRef.close();
  }
  createFormControls() {
    this.firstName = new FormControl('', [
      Validators.required,
      Validators.pattern(this.namePattern)

    ]);
    this.lastName = new FormControl('', [
      Validators.required,
      Validators.pattern(this.namePattern)
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern)

    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordPattern)
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordPattern)
    ])
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('confirmPassword').value
      ? null : { 'mismatch': true };
  }

  createForm() {
    this.myform = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    }, this.passwordMatchValidator);
  }
}
