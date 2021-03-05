import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  get getUser() {
    return JSON.parse(this._dashboardService.getUserData()!)
  }

  get postData() {
    return JSON.parse(this._dashboardService.getPostData()!)
  }

  get getFriendData() {
    return JSON.parse(this._dashboardService.getPanelData()!)
  }

  allPosts = [];
  postCount = "";
  followingsCount = 0;
  followings: any = [];
  unfollowings: any = [];
  whoToFollow: any = [];
  friends: any = [];
  isSee5More = true;
  isSee10More = true;
  isTimeline = false;
  isAbout = false;
  isPhotos = false;
  isFriends = false;

  constructor(public _dashboardService: UserService, private _router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getUrlSegment()
    this._dashboardService.dashboard()
    .subscribe(
      res => {
        this.allPosts = this.postData
        this.postCount = this.postData.length;
        for(var i = 0; i < this.getFriendData.friends.length; i++) {
          var followUsers = this.getFriendData.friends[i];
          if(this.getFriendData.friends[i].friendStatus == "Following") {
            (this.followings).push(followUsers)
            if(this.friends.length < 9) {
              (this.friends).push(followUsers)
            }
          } else {
            this.followingsCount += 1;
            (this.unfollowings).push(followUsers)
            if(this.whoToFollow.length < 4) {
              (this.whoToFollow).push(followUsers)
            }
          }
        }
        
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

  checkActiveLink(value: any) {
    switch(value) {
      case "timeline" :
        this.isTimeline = true
        break;
      case "about" :
        this.isAbout = true
        break;
      case "photos" :
        this.isPhotos = true
        break;  
      case "friends" :
        this.isFriends = true
        break;  
    }
    
  }

  getUrlSegment() {
    var urlSegment = this.route.snapshot.children[0].routeConfig?.path;
    this.checkActiveLink(urlSegment)
  }

  see5More() {
    var currentWhoToFollow = this.whoToFollow.length;
    for( var i = currentWhoToFollow; i < currentWhoToFollow + 5; i++)  {
      if(this.whoToFollow.length < this.unfollowings.length) {
        (this.whoToFollow).push(this.unfollowings[i])
      } else {
        this.isSee5More = false;
      }
    }
  }

  see5MoreLess() {
    this.whoToFollow = [];
    for( var i = 0; i < 4; i++)  {
      (this.whoToFollow).push(this.unfollowings[i])
      this.isSee5More = true;
    }
  }

  see10More() {
    var currentFriends = this.friends.length;
    for( var i = currentFriends; i < currentFriends + 10; i++)  {
      if(this.friends.length < this.followings.length) {
        (this.friends).push(this.followings[i])
      } else {
        this.isSee10More = false;
      }
    }
  }

  see10MoreLess() {
    this.friends = [];
    for( var i = 0; i < 9; i++)  {
      (this.friends).push(this.followings[i])
      this.isSee10More = true;
    }
  }

  isActive(query: string) {
    this.isTimeline = this.isAbout = this.isPhotos = this.isFriends = false;
    this.checkActiveLink(query)
    this._router.navigate([`/dashboard/${query}`])
  }
  
}