import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from "../Services/AuthorizationService";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isRegistered: boolean;

  constructor(private authService: AuthorizationService ) { }

  ngOnInit() {
    this.isRegistered = this.authService.token ? true : false;
  }

}
