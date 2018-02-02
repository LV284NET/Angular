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
import { Constants } from './../constants';
import { SpinnerService } from '../Services/spinner.service';

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
    private favoriteService: FavoriteService,
    private spinnerService: SpinnerService,
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
      this.SnackBar.open("Not permitted", "Got It");
    }
  }

  getInfo(): any 
  {
    //Show Loading Animation
    this.spinnerService.ShowSpinner(Constants.SpinnerComponentConstants.AnimationName);

    this.ProfileService.getUser(JSON.parse(localStorage.getItem("currentUser")).id)
      .subscribe(response => 
        {
            //Hide Loading Animation
            this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);

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
    //Show Loading Animation
    this.spinnerService.ShowSpinner(Constants.SpinnerComponentConstants.AnimationName);

    this.ProfileService.getFavoritePlaces(JSON.parse(localStorage.getItem("currentUser")).id).subscribe(response => {
      //Hide Loading Animation
      this.spinnerService.HideSpinner(Constants.SpinnerComponentConstants.AnimationName);

      response.forEach(element => {
        this.favoritePlaces.push(new Place(element.PlaceId, element.Name, element.CityName, element.Description, element.PicturePlace, element.CityId));
      })})
  }

  changePassword() {
    let dialog = this.dialog.closeAll();
    let dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: "500px"
    });
  }
}
