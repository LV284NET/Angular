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
    this.errorMessage = error._body;
    this.snackBar.open(this.errorMessage, "Got it");
  }
} 
