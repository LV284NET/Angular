import { Component, OnInit, Input, Inject } from '@angular/core';
import { AuthorizationService } from '../Services/AuthorizationService';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ErrorHandlingService } from '../Services/error-handling.service';
import { error } from 'util';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @Input() oldPassword: string;
  @Input() newPassword: string;
  @Input() newPasswordConfirm: string;

  myform: FormGroup;
  OldPassword: FormControl;
  NewPassword: FormControl;
  NewPasswordConfirm: FormControl;


  public errorMessage: string;
  
  constructor(private router: Router,
    private authorizeService: AuthorizationService, private errorService: ErrorHandlingService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createFormControls() {
    this.OldPassword = new FormControl('', [
      Validators.required,
      Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{8,20})')
    ]);
    this.NewPassword = new FormControl('', [
      Validators.required,
      Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{8,20})')
    ]);
    this.NewPasswordConfirm = new FormControl('', [
      Validators.required,
      Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{8,20})')

    ]);
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('NewPassword').value === g.get('NewPasswordConfirm').value
      ? null : { 'mismatch': true };
  }
  createForm() {
    this.myform = new FormGroup({
      OldPassword: this.OldPassword,
      NewPassword: this.NewPassword,
      NewPasswordConfirm: this.NewPasswordConfirm,
    }, this.passwordMatchValidator);
  }

  public onSubmit() 
  {
       this.authorizeService.changePassword(this.oldPassword, this.newPassword, this.newPasswordConfirm)
       .subscribe(response => {
         this.dialogRef.close();
         this.snackBar.open("Password changed", "Got it", {
           duration: 2000
         });
       }, error => {
         this.errorService.handleError(error);
       }

     )
  }
}
