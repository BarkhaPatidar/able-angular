import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'about-component',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  get getUser() {
    return JSON.parse(this._aboutService.getUserData()!)
  }
  
  constructor(public _aboutService: UserService) {}

  ngOnInit() {
   
  }
}