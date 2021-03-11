import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AddPostModal } from '../add-post/add-post.component';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'timeline-component',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  posts?: any;

  constructor(public _timelineService: UserService, private modalService: NgbModal, private _router: Router) {}

  ngOnInit(): void {
    this.postObservable();
  }

  postObservable() {
    this._timelineService.getPostData().subscribe(postData => {
      this._timelineService.postInfo(postData)
      this.getPosts();
    })
  }

  getPosts() {
    this._timelineService.postData$
    .subscribe(
      res => {
        this.posts = res.posts.reverse()
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

  closeResult = '';

  open(content: any): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    });
  }

  openAddPostModal(): void {
    this.modalService.open(AddPostModal);
  }

  convertTime(dateText: Date): string {
    return moment(dateText).fromNow();
  }

  likePost(postId: number): void {
    this._timelineService.likePost({postId})
    .subscribe(
      response => {
        // location.reload();
        this._timelineService.postInfo(response)
      },
      error => {
        if(error instanceof HttpErrorResponse) {
          if(error.status === 401) {
            this._router.navigate(['/login'])
          } else if(error.status === 403) {
            this._router.navigate(['/login'])
          }
        }
      }
    );
  } 
}