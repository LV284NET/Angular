import { Component, OnInit, Input } from '@angular/core';
import { SpinnerService } from './../Services/spinner.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
//import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  // animations: [
  //   trigger('navigationEvent', [
  //     state('hidden', style({
  //       display: 'none'
  //       //top: '-51px'
  //     })),
  //     state('shown', style({
  //       display: 'block'
  //       //top: '0'
  //     })),
  //     transition('hidden => shown', animate('300ms ease-in')),
  //     //transition('shown => hidden', animate('500ms ease-out'))
  //   ])
  // ]

})
export class SpinnerComponent implements OnInit {

  @Input() name: string;
  @Input() loadingImage: string = '../assets/img/lg.double-ring-spinner.gif';
  @Input() isShown: boolean = false;

  public state: string = 'shown';

  constructor(private spinnerService: SpinnerService,
              //public dialogRef: MatDialogRef<SpinnerComponent>
              ) { }

  ngOnInit() {
    if(!this.name) throw new Error("Spinner must have a 'name' attribute.")

    this.spinnerService.Register(this);
  }

  public Hide(): void{
    this.state = 'hidden';
    this.spinnerService.HideSpinner('RoutingSpinner');
    //this.closeDialog();
  }

  public Show(): void{
    this.state = 'shown';
    this.spinnerService.ShowSpinner('RoutingSpinner');
  }

  // private closeDialog() {
  //  this.dialogRef.close();
  // }

}
