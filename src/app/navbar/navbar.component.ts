import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { AuthorizationService } from "../Services/AuthorizationService";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isRegistered: boolean;

  constructor(public authService: AuthorizationService, private router: Router ) {
   }

  ngOnInit() {   
    this.isRegistered = this.authService.token != null ? true : false;
  }

  logout() {
    this.authService.logout();
    //location.reload();
  }
}
