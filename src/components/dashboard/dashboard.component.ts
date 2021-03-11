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
  isDashMenuCollapsed = true;
  user: any;
  allPosts = [];
  postCount = "";
  followingsCount = 0;
  followings: any = [];
  unfollowings: any = [];
  suggetions: any = [];
  friends: any = [];
  isSeeMoreSuggestions: boolean = true;
  isSeeMoreFriends: boolean = true;
  isTimeline: boolean = false;
  isAbout: boolean = false;
  isPhotos: boolean = false;
  isFriends: boolean = false;
  showSuggetionScroll: boolean = false;
  showFriendsScroll: boolean = false;

  constructor(public _dashboardService: UserService, private _router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userObservable();
    this.postObservable();
    this.friendObservable();
    this.getUrlSegment(); 
  }

  userObservable() {
    this._dashboardService.getUserData().subscribe(userdataData => {
      this._dashboardService.userInfo(userdataData)
      this.getUser();
    })
  }

  postObservable() {
    this._dashboardService.getPostData().subscribe(postData => {
      this._dashboardService.postInfo(postData)
      this.getPosts();
    })
  }

  friendObservable() {
    this._dashboardService.getPanelData().subscribe(friendsData => {
      this._dashboardService.friendInfo(friendsData)
      this.getAllFriends();
    })
  }

  getUser() {
    this._dashboardService.userData$
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

  getPosts() {
    this._dashboardService.postData$
    .subscribe(
      res => {
        this.allPosts = res.posts
        this.postCount = res.posts.length;
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

  getAllFriends() {
    this._dashboardService.friendData$
    .subscribe(
      res => {
        this.followingsCount = 0;
        this.followings = [];
        this.unfollowings = [];
        for(var i = 0; i < res.friends.length; i++) {
          var followUsers = res.friends[i];
          if(res.friends[i].friendStatus == "Following") {
            this.followingsCount += 1;
            (this.followings).push(followUsers)
            if(this.friends.length < 9) {
              (this.friends).push(followUsers)
            }
          } else {
            (this.unfollowings).push(followUsers)
            if(this.suggetions.length < 4) {
              (this.suggetions).push(followUsers)
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

  checkActiveLink(value: any): void {
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

  getUrlSegment(): void {
    var urlSegment = this.route.snapshot.children[0].routeConfig?.path;
    this.checkActiveLink(urlSegment)
  }

  seeMoreSuggestions(): void {
    this.showSuggetionScroll = true; 
    var currentSuggetions = this.suggetions.length;
    for( var i = currentSuggetions; i < currentSuggetions + 5; i++)  {
      if(this.suggetions.length < this.unfollowings.length) {
        (this.suggetions).push(this.unfollowings[i])
      } else {
        this.isSeeMoreSuggestions = false;
      }
    }
  }

  seeLessSuggestions(): void {
    this.showSuggetionScroll = false; 
    this.suggetions = [];
    for( var i = 0; i < 4; i++)  {
      (this.suggetions).push(this.unfollowings[i])
      this.isSeeMoreSuggestions = true;
    }
  }

  seeMoreFriends(): void {
    this.showFriendsScroll = true;
    var currentFriends = this.friends.length;
    for( var i = currentFriends; i < currentFriends + 10; i++)  {
      if(this.friends.length < this.followings.length) {
        (this.friends).push(this.followings[i])
      } else {
        this.isSeeMoreFriends = false;
      }
    }
  }

  seeLessFriends(): void {
    this.showFriendsScroll = false;
    this.friends = [];
    for( var i = 0; i < 9; i++)  {
      (this.friends).push(this.followings[i])
      this.isSeeMoreFriends = true;
    }
  }

  isActive(query: string): void {
    this.isTimeline = this.isAbout = this.isPhotos = this.isFriends = false;
    this.checkActiveLink(query)
    this.isDashMenuCollapsed = true;
    this._router.navigate([`/dashboard/${query}`])
  }
  
}