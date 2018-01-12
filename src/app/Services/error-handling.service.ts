import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import{ NgModule } from "@angular/core";
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class ErrorHandlingService{
  
  private errorMessage: string;

  constructor(private snackBar: MatSnackBar) { 
  }

  handleError(error: Response): void {
    switch(error.status){
      case 0: this.errorMessage = "Server is not available now! Please try later"; break;
      case 400: break;
      case 500: break;
    }
    this.snackBar.open(this.errorMessage, "Got it");
  }
} 
