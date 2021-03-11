import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'photos-component',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  posts?: any;
  
  constructor(public _photosService: UserService, private _router: Router) {}

  ngOnInit(): void {
   this.postObservable();
  }

  postObservable() {
    this._photosService.getPostData().subscribe(postData => {
      this._photosService.postInfo(postData)
      this.getPosts();
    })
  }

  getPosts() {
    this._photosService.postData$
    .subscribe(
      res => {
        this.posts = res.posts
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