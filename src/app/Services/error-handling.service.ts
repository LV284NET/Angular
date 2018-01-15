import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import{ NgModule } from "@angular/core";
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class ErrorHandlingService{
  
  private errorMessage: string;

  constructor(private snackBar: MatSnackBar) { 
  }

  handleError(error: any): void {
    if(error.status == 400 && error._body.includes("invalid_grant")) {
      this.errorMessage = JSON.parse(error._body).error_description;
    } else {
      this.errorMessage = error._body;
      this.errorMessage = this.errorMessage.substring(1, this.errorMessage.length - 1);
    }
    
    this.snackBar.open(this.errorMessage, "Got it");
  }
} 
