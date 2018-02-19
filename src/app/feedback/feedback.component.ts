import { Component, OnInit, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Action } from 'rxjs/scheduler/Action';
import { Constants } from '../constants'

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})

export class FeedbackComponent implements OnInit {

  //#region Inputs

  @Input() Email: string;
  @Input() Suggestion: string;
  @Input() FirstName: string;
  @Input() LastName: string;

  //#endregion

  //#region Private Properties

  private suggestions: FormControl;
  private suggestion: any;
  private namePattern: string = Constants.DataValidationConstants.NamePattern;
  private emailPattern: string = Constants.DataValidationConstants.EmailPattern;

  //#endregion

  //#region Public Properties

  public myform: FormGroup;
  public firstName: FormControl;
  public lastName: FormControl;
  public email: FormControl;
  public formspreeUrl: string = Constants.FeedbackComponentConstants.FormspreeUrl;

  //#endregion

  //#region Constructor

  constructor(
    private dialogRef: MatDialogRef<FeedbackComponent>, 
    private snackBar: MatSnackBar) { }

  //#endregion

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  //#region Private Methods

  private createFormControls() {
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
    this.suggestions = new FormControl()
  }
  createForm() {
    this.myform = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      suggestions: this.suggestions
    });
  }

  private closeDialog() {
    this.dialogRef.close();
  }

  //#endregion
}