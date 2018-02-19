import { Component, OnInit, Input, Inject, HostListener } from '@angular/core';
import { AuthorizationService } from "../Services/AuthorizationService";
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { DOCUMENT } from "@angular/platform-browser";
import { WINDOW } from "../Services/window.service";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SpinnerService } from '../Services/spinner.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']

})
export class FooterComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {}

  suggestions(){
    let dialog = this.dialog.closeAll()
    let dialogRef = this.dialog.open(FeedbackComponent, {
      width: "500px"
    });
  }
}
