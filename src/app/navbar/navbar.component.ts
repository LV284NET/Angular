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

import { FormControl } from '@angular/forms';
import { SearchCitiesAndPlacesService } from './../Services/search-cities-and-places.service';
import { SearchItem } from './../search-item'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('navBarState', [
      state('hidden', style({
        top: '-51px'
      })),
      state('shown',   style({
        top: '0'
      })),
      transition('hidden => shown', animate('300ms ease-in')),
      transition('shown => hidden', animate('500ms ease-out'))
    ]),

    trigger('searchState', [
      state('hidden', style({
        top: '-20px',
        height: '0',
        width: '100%',
        display: 'none'
      })),
      state('shown',   style({
        top: '50px',
        height: '70px',
        width: '100%',
        padding: '10px 0 0',
        display: 'block'        
      })),
      transition('hidden => shown', animate('300ms ease-in')),
      transition('shown => hidden', animate('500ms ease-out'))
    ]),
  ]
})
export class NavbarComponent implements OnInit {

  private previousPosition: number = 0;
  private currentPosition: number = 0;  
  private inputLine: string;

  public formInput: FormControl = new FormControl();
  public searchResult: SearchItem[] = [];
  public registerDialogRef: MatDialog;
  public loginDialogRef: MatDialog;
  public userName: string;
  public state: string = 'shown';
  public searchState: string = 'hidden';

  constructor(
    public authService: AuthorizationService, 
    private router: Router, 
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private searchService: SearchCitiesAndPlacesService,

    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window) {
  }
  
  ngOnInit() {
    this.formInput.valueChanges
      .debounceTime(500)
      .subscribe(input => {
        this.inputLine = input.toString();
        if (this.inputLine != null && this.inputLine != "") {
          this.searchResult.length = 0;
          this.searchService.searchCitiesAndPlaces(this.inputLine)
            .subscribe(response => {
              response.forEach(element => {
                if (element.Type == "City") {
                  this.searchResult.push(new SearchItem(
                    element.Id,
                    null,
                    element.Name,
                    element.Type,
                    this.router));
                } else {
                  this.searchResult.push(new SearchItem(
                    element.CityId,
                    element.Id,
                    element.Name,
                    element.Type,
                    this.router));
                }
              });
            });
        }
        else {
          this.searchResult.length = 0;
        }
      });  
  }


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
      this.router.navigateByUrl("/profile");
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.currentPosition = this.window.pageYOffset || 
    this.document.documentElement.scrollTop || 
    this.document.body.scrollTop || 0;

    if (this.currentPosition > this.previousPosition) {
      this.state = 'hidden';
      this.searchState = 'hidden';
    }    
    else if (this.currentPosition <= this.previousPosition) {
      this.state = 'shown';      
    }
    this.previousPosition = this.currentPosition;
  }

  searchFormToggle(){
    if(this.searchState == 'hidden'){
      this.searchState = 'shown';
    }
    else{
      this.searchState = 'hidden';
    }
  }
}
