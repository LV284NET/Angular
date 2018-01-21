import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProfileService } from '../Services/profile.service';
import { User } from '../user';

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

  ) { 
    this.user = new User("", "", "");
  }

  ngOnInit() {
    this.getInfo();
  }

  getInfo(): any 
  {    
    this.ProfileService.getUserByEmail()
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
