import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProfileService } from '../Services/profile.service';
import { User } from '../user';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Place } from '../place';
import { FavoriteService } from "../Services/favorite.service";
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  favoritePlaces: Place [] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private ProfileService: ProfileService,
    private SnackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private favoriteService: FavoriteService
  ) { 
    this.user = new User("", "", "");
  }

  ngOnInit() {
    if (localStorage.getItem("currentUser") != null)
    {
      this.getInfo();
      this.getFavoritePlaces();      
    }  
    else
    {
      this.router.navigateByUrl("/main");
      //this.SnackBar.open("Not permitted", "Got It");
    }
  }

  checkUserProfile(): boolean
  {
      const userId = +this.route.snapshot.paramMap.get('Id');    
      return (userId == JSON.parse(localStorage.getItem("currentUser")).id);
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

  removeFavoritePlace(placeId): void{

    this.favoritePlaces.splice(
      this.favoritePlaces.findIndex(element=>element.placeId == placeId), 1);
    this.favoriteService.DeletePlace(placeId);
  }

  getFavoritePlaces(): any
  {
    const userId = +this.route.snapshot.paramMap.get('Id');
    
    this.ProfileService.getFavoritePlaces(userId).subscribe(response => {
      response.forEach(element => {
        this.favoritePlaces.push(new Place(element.PlaceId,element.Name, "", "", element.PicturePlace));
      })})
  }

  changePassword() {
    let dialog = this.dialog.closeAll();
    let dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: "500px"
    });
  }
}
