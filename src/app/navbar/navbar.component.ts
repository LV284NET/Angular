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

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('navBarState', [
      state('hidden', style({
        top: '-70px'
      })),
      state('shown',   style({
        top: '0'
      })),
      transition('hidden => shown', animate('300ms ease-in')),
      transition('shown => hidden', animate('500ms ease-out'))
    ])
  ]
})
export class NavbarComponent implements OnInit {

  public state: string = 'shown';

  private previousPosition: number = 0;
  private currentPosition: number = 0;


  constructor(
    public authService: AuthorizationService, 
    private router: Router, 
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window) {
  }
  
  ngOnInit() {
  }
  public registerDialogRef: MatDialog;
  public loginDialogRef: MatDialog;
  public userName: string;

  suggestions(){
    let dialog = this.dialog.closeAll()
    let dialogRef = this.dialog.open(FeedbackComponent, {
      width: "500px"
      
    });
  }

  signUp() {
    let dialog = this.dialog.closeAll()
    let dialogRef = this.dialog.open(RegisterComponent, {
      width: "500px"
      
    });
  }

  signIn() {
    this.authService.UserId;
    let dialog = this.dialog.closeAll();
    let dialogRef = this.dialog.open(LoginComponent, {
      width: "500px"
    });
  }

  logout() {
    JSON.parse(localStorage.getItem("currentUser")).Id;
    this.authService.logout();
    this.snackBar.open("You logged out", "Got it", {
      duration: 2000
    });
  }

  profile(){
      let userId=JSON.parse(localStorage.getItem("currentUser")).id;
      this.router.navigateByUrl("/"+userId);
  }
  
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.currentPosition = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if (this.currentPosition > this.previousPosition) {
      this.state = 'hidden';
    } else if (this.currentPosition <= this.previousPosition) {
      this.state = 'shown';
    }
    this.previousPosition = this.currentPosition;
  }
}
