import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _loginUrl = "http://localhost:3000/login";
  _signupUrl = "http://localhost:3000/register";
  _dashboardUrl = "http://localhost:3000/user-dashboard";

  constructor(private _http: HttpClient, private _router: Router) { }

  login(userData: any) {
    return this._http.post<any>(this._loginUrl, userData)
  }

  register(userData: any) {
    return this._http.post<any>(this._signupUrl, userData)
  }

  dashboard() {
    return this._http.get<any>(this._dashboardUrl)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getUserData() {
    return localStorage.getItem('userData')
  }

  getPostData() {
    return localStorage.getItem('timelineData')
  }

  getPanelData() {
    return localStorage.getItem('panelData')
  }

  logout() {
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }

  private _successMessageSource = new Subject<string>();
  successMessage$ = this._successMessageSource.asObservable();

  sendMessage(message: string) {
    this._successMessageSource.next(message);
  }
  
}