import { Component, OnInit, Input, NgZone, Renderer, ElementRef, ViewChild } from '@angular/core';
import { AuthorizationService } from './Services/AuthorizationService';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router'
import { trigger, state, style, animate, transition, query } from '@angular/animations';
import { SpinnerComponent } from './spinner/spinner.component'
import { SpinnerService} from './Services/spinner.service';
import { error } from 'util';
import { User } from "./user";
import { Constants } from './constants';

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

  public spinnerName: string = Constants.SpinnerComponentConstants.AnimationName;

  constructor() { }

    // change the animation state
    public getRouteAnimation(outlet) {
      return outlet.activatedRouteData.animation;
    }
}