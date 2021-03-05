import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'friends-component',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  get getFriendData() {
    return JSON.parse(this._friendsService.getPanelData()!).friends
  }

  constructor(public _friendsService: UserService) {}

  ngOnInit() {
  
  }
}