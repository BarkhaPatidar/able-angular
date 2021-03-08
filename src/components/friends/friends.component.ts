import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'friends-component',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  get friends() {
    return JSON.parse(this._friendsService.getPanelData()!)
  }

  constructor(public _friendsService: UserService) {}

  ngOnInit(): void {
  
  }

  checkStatus(status: string): string {
    var followStatus = "Follow"
    var unfollowStatus = "Unfollow"
    var statusValue = "Following"
    if(status == statusValue) {
      return unfollowStatus
    } else {
      return followStatus
    }
  }

  changeFollowStatus(userId: string): void {
    var followStatus = "Following"
    var unfollowStatus = "Unfollowing"
    var panelData = [];
    panelData = this.friends;
    for( var i = 0; i < panelData.length; i++) {
      if(panelData[i].userId == userId) {
        if(panelData[i].friendStatus == followStatus) {
          panelData[i].friendStatus = unfollowStatus
        } else {
          panelData[i].friendStatus = followStatus
        }
      }
    }
    localStorage.setItem("panelData", JSON.stringify(panelData));
    location.reload()
  }
}