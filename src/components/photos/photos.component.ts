import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'photos-component',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  get postData() {
    return JSON.parse(this._photosService.getPostData()!)
  }
  
  constructor(public _photosService: UserService) {}

  ngOnInit() {
   
  }
}