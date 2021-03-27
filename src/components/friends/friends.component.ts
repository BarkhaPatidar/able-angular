import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'friends-component',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  friends?: any;

  constructor(public _friendsService: UserService, private _router: Router) {}

  ngOnInit(): void {
    this.friendObservable();
  }

  friendObservable() {
    this._friendsService.getPanelData().subscribe(friendsData => {
      this._friendsService.friendInfo(friendsData)
      this.getAllFriends();
    })
  }

  getAllFriends() {
    this._friendsService.friendData$
    .subscribe(
      res => {
        this.friends = res.friends
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

  changeFollowStatus(userId: number): void {
    this._friendsService.followUser({userId})
    .subscribe(
      res => {
        // this.friends = res.friends
        // location.reload();
        this._friendsService.friendInfo(res)
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