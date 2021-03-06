import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   
  
   constructor(
    private _userService: UserService,
    private router: Router
  ) { }
  canActivate() {
    var role;
    role = <string>localStorage.getItem("role");
    if (this._userService.loggedIn()) {
      return true;
    }
    else if (!!role) {
      if (role == "TEACHER") {
        this.router.navigate(["/teacher"]);    
      }
      else if (role == "ADMIN") {
        this.router.navigate(["/admin"]);
      }
      return false;
    }
    else {
      console.log("inside user else control block")
      this.router.navigate(["/login"]);
      return false;
    }
  }
  
  
}
