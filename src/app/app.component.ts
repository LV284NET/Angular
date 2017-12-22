import { Component, OnInit, Input } from '@angular/core';
import { AuthorizationService } from './Services/AuthorizationService';
//import { CookieService } from 'angular2-cookie/core';

import { error } from 'util';
import {User} from "./user";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){}
}