import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  get loggedIn() {
    return this._userService.loggedIn()
  }

  logout() {
    return this._userService.logout()
  }

  get user() {
    return JSON.parse(this._userService.getUserData()!)
  }
  
  constructor(public _userService: UserService) {}

  ngOnInit() {

  }
  

}
