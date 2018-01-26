import { Component, OnInit, Input } from '@angular/core';
import { SpinnerService } from './../Services/spinner.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Constants } from './../constants';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  @Input() name: string;
  @Input() loadingImage: string = Constants.LoadingAnimation.AnimationUrl;
  @Input() isShown: boolean = false;

  public state: string = 'shown';
  public spinnerName: string;

  constructor(private spinnerService: SpinnerService,
              //private constantData: Constants
              ) { }

  ngOnInit() {
    if(!this.name) throw new Error("Spinner must have a 'name' attribute.")
    this.spinnerService.Register(this);
    this.spinnerName = Constants.LoadingAnimation.AnimationName;
  }

  public Hide(): void{
    this.state = 'hidden';
    this.spinnerService.HideSpinner(this.spinnerName);
    //this.closeDialog();
  }

  public Show(): void{
    this.state = 'shown';
    this.spinnerService.ShowSpinner(this.spinnerName);
  }

  // private closeDialog() {
  //  this.dialogRef.close();
  // }

}
