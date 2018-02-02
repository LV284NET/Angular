import { Injectable } from '@angular/core';
import { AuthorizationService } from "./AuthorizationService";
import { MatSnackBar } from '@angular/material';


@Injectable()
export class TokenExpiredService{

  constructor(private snackBar : MatSnackBar, private authService: AuthorizationService) { }


  checkToken() {

    if (localStorage.getItem("currentUser") != null){
      let tokenTimer = JSON.parse(localStorage.getItem('currentUser')).tokenDurating;
      let minute = 60000;
      let second = 1000;
      let thirtySecond = 30000;

      if ((Date.now() > tokenTimer)) {
          this.authService.logout();
          this.snackBar.open("You are logged out", "Got it");        
      }
      else 
      {
        if ((Date.now() > tokenTimer - minute))
        {
          this.snackBar.open("It is less than minute until the end of session", "Got it", );        
          setInterval(()=> { this.checkToken(); } , thirtySecond);
        }
        else{
          let timeOut = tokenTimer - Date.now() - minute + second;
          setInterval( ()=> { this.checkToken(); }, timeOut);
        }
      }
    }
  }
}