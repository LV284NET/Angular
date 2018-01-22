import { Component, OnInit, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Action } from 'rxjs/scheduler/Action';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.css']
  })

  export class FeedbackComponent implements OnInit {

    @Input() Email: string;
    @Input() Suggestion: string;
    @Input() FirstName: string;
    @Input() LastName: string;

    myform: FormGroup;
    firstName: FormControl;
    lastName: FormControl;
    email: FormControl;
    suggestions: FormControl;

    constructor(private dialogRef: MatDialogRef<FeedbackComponent>, private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.createFormControls();
        this.createForm();
      }
    
   suggestion() {
    
    this.snackBar.open("Your offer has been sent", "Got it", {
        duration: 2000
      });
    this.dialogRef.close();
   }
   createFormControls() {
    this.firstName = new FormControl('', [
        Validators.required,
        Validators.pattern("^[а-яА-ЯёЁa-zA-Zʼ'є Є]{2,20}$")
      ]);
      this.lastName = new FormControl('', [
        Validators.required,
        Validators.pattern("^[а-яА-ЯёЁa-zA-Zʼ'є Є]{2,20}$")
      ]);
      this.email = new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$")
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
   closeDialog() {
    this.dialogRef.close();
  }
  }