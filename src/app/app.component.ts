import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isMenuCollapsed = true;
  user?: any;

  get loggedIn() {
    return this._userService.loggedIn()
  }

  logout() {
    return this._userService.logout()
  }
  
  constructor(public _userService: UserService, private _router: Router) {}

  ngOnInit() {
    this.userObservable();
  }

  userObservable() {
    this._userService.getUserData().subscribe(userdataData => {
      this._userService.userInfo(userdataData)
      this.getUser();
    })
  }
  
  getUser() {
    this._userService.userData$
    .subscribe(
      res => {
        this.user = res.user;
      },
      err => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            this._router.navigate(['/login'])
          } else if(err.status === 403) {
            this._router.navigate(['/login'])
          }
        }
      }
    )
  }
}
