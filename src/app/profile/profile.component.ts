import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProfileService } from '../Services/profile.service';
import { User } from '../user';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private ProfileService: ProfileService,
    private SnackBar: MatSnackBar,
    private router: Router
  ) { 
    this.user = new User("", "", "");
  }

  ngOnInit() {
    if (localStorage.getItem("currentUser") != null)
      this.getInfo();
    else
    {
      this.router.navigateByUrl("/main");
      //this.SnackBar.open("Not permitted", "Got It");
    }
  }

  getInfo(): any 
  {
    const userId = +this.route.snapshot.paramMap.get('Id')    
    this.ProfileService.getUserByEmail(userId)
      .subscribe(response => 
        {
            this.user = new User 
            (
            response.Email,
            response.FirstName,
            response.LastName
            ) 
      })
  }
}
