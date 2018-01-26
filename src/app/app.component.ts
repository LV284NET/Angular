import { Component, OnInit, Input, NgZone, Renderer, ElementRef, ViewChild } from '@angular/core';
import { AuthorizationService } from './Services/AuthorizationService';
//import { CookieService } from 'angular2-cookie/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router'
import { trigger, state, style, animate, transition, query } from '@angular/animations';
//import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerComponent } from './spinner/spinner.component'
import { SpinnerService} from './Services/spinner.service';
//import { MatDialog, MatDialogRef } from '@angular/material';
import { error } from 'util';
import { User } from "./user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routerAnimation', [
      transition('* <=> *', [
        // Initial state of new route
        query(':enter',
          style({
            position: 'fixed',
            width:'100%',
            transform: 'translateX(-100%)'
          }),
          {optional:true}),
        // move page off screen right on leave
        query(':leave',
          animate('500ms ease',
            style({
              position: 'fixed',
              width:'100%',
              transform: 'translateX(100%)'
            })
          ),
        {optional:true}),
        // move page in screen from left to right
        query(':enter',
          animate('500ms ease',
            style({
              opacity: 1,
              transform: 'translateX(0%)'
            })
          ),
        {optional:true}),
      ])
    ])
  ]
})
export class AppComponent {

  //public isLoaded: boolean = false; 
  //public loading: boolean = true;
 // @ViewChild('spinnerElement')
  //spinnerElement: ElementRef

 // private dialogRef: any;

  constructor(
    //private router: Router,  
    //public dialog: MatDialog
    //private ngZone: NgZone,
    //private renderer: Renderer,
    //private spinnerService: SpinnerService,
    //private spinner: SpinnerComponent
    ) {
    //router.events.subscribe((event: RouterEvent) => {
      //this.spinnerService.ShowSpinner('RoutingSpinner');
      //this.navigationInterceptor(event);
    //})
  }

  // private navigationInterceptor(event: RouterEvent): void {
  //   if (event instanceof NavigationStart) {
  //     //this.loading = true
  //     // this.ngZone.runOutsideAngular(() => {
  //     //   this.renderer.setElementStyle(
  //     //     this.spinnerElement.nativeElement,
  //     //     'opacity', '1')
  //     //})
  //     //this.spinner.Show();
  //     //this.showSpinner()
  //   }
  //   if (event instanceof NavigationEnd) {
  //     //this.loading = false
  //     //this.hideSpinner()
  //     //this.spinnerService.HideSpinner('RoutingSpinner');
  //     //this.spinner.Hide();
  //     //this.isLoaded = true;
  //   }

  //   // Set loading state to false in both of the below events to hide the spinner in case a request fails
  //   if (event instanceof NavigationCancel) {
  //     //this.loading = false
  //     //this.hideSpinner()
  //     //this.spinnerService.HideSpinner('RoutingSpinner');
  //   }
  //   if (event instanceof NavigationError) {
  //     //this.loading = false
  //     //this.hideSpinner()
  //     //this.spinnerService.HideSpinner('RoutingSpinner');
  //   }
  // }

  // private hideSpinner(): void {
  //   // We wanna run this function outside of Angular's zone to
  //   // bypass change detection,
  //   this.ngZone.runOutsideAngular(() => {
  //     // For simplicity we are going to turn opacity on / off
  //     // you could add/remove a class for more advanced styling
  //     // and enter/leave animation of the spinner
  //     this.renderer.setElementStyle(
  //       this.spinnerElement.nativeElement,
  //       'opacity','0')
  //   })
  // }

    // change the animation state
    public getRouteAnimation(outlet) {
      return outlet.activatedRouteData.animation;
    }

    // private showSpinner() {
    //   let dialog = this.dialog.closeAll()
    //   this.dialogRef = this.dialog.open(SpinnerComponent, {
    //     width: "500px"        
    //   });
    // }
}