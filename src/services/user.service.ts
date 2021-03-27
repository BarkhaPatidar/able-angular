import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _loginUrl = "http://localhost:3000/login";
  _signupUrl = "http://localhost:3000/register";
  _dashboardUrl = "http://localhost:3000/user-dashboard";
  _friendsUrl = "http://localhost:3000/friends";
  _postsUrl = "http://localhost:3000/posts";
  _addPostUrl = "http://localhost:3000/add-post";
  _likePostUrl = "http://localhost:3000/like-post";
  _updateUserUrl = "http://localhost:3000/update-user";
  _followUserUrl = "http://localhost:3000/follow-user";

  constructor(private _http: HttpClient, private _router: Router) { }

  login(userData: any) {
    return this._http.post<any>(this._loginUrl, userData)
  }

  register(userData: any) {
    return this._http.post<any>(this._signupUrl, userData)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  private _userDataSource = new BehaviorSubject<any>(null);
  private _postDataSource = new BehaviorSubject<any>(null);
  private _friendDataSource = new BehaviorSubject<any>(null);
  userData$ = this._userDataSource.asObservable();
  postData$ = this._postDataSource.asObservable();
  friendData$ = this._friendDataSource.asObservable();

  getUserData() {
    return this._http.get<any>(this._dashboardUrl)
    // this._http.get<any>(this._dashboardUrl).subscribe( user => {
    //   this._userDataSource.next(user);
    // })
  }

  getPostData() {
    // return localStorage.getItem('timelineData')
    return this._http.get<any>(this._postsUrl)
    // this._http.get<any>(this._postsUrl).subscribe( posts => {
    //   this._postDataSource.next(posts);
    // })
  }

  getPanelData() {
    // return localStorage.getItem('panelData')
    return this._http.get<any>(this._friendsUrl)
    // this._http.get<any>(this._friendsUrl).subscribe( friends => {
    //   this._friendDataSource.next(friends);
    // })
  }

  addPost(postData: any) {
    return this._http.post<any>(this._addPostUrl, postData)
  }

  likePost(postData: any) {
    return this._http.post<any>(this._likePostUrl, postData)
  }

  updateUserInfo(userData: any) {
    return this._http.post<any>(this._updateUserUrl, userData)
  }

  followUser(userId: any) {
    return this._http.post<any>(this._followUserUrl, userId)
  }

  logout() {
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }

  userInfo(currentUser: any) {
    this._userDataSource.next(currentUser);
  }

  postInfo(posts: any) {
    this._postDataSource.next(posts);
  }

  friendInfo(friends: any) {
    this._friendDataSource.next(friends);
  }
  
}