import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(public _userService: UserService) {}
  username = "";

  ngOnInit() {
    var userData = this._userService.getUserData()
    this.username = (JSON.parse(userData!)).name
  }
  

}
