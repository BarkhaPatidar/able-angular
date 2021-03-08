import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AddPostModal } from '../add-post/add-post.component';
import * as moment from 'moment';

@Component({
  selector: 'timeline-component',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  get posts() {
    return JSON.parse(this._timelineService.getPostData()!)
  }

  constructor(public _timelineService: UserService, private modalService: NgbModal) {}

  ngOnInit(): void {
    
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
    var allPosts = [];
    allPosts = this.posts;
    for(var i = 0; i < allPosts.length; i++) {
      if(allPosts[i].postId == postId) {
        var liked = "liked";
        var likeStatus = allPosts[i].liked;
        if(likeStatus == liked) {
          allPosts[i].liked = "";
          allPosts[i].likes = allPosts[i].likes - 1;
        } else {
          allPosts[i].liked = liked;
          allPosts[i].likes = allPosts[i].likes + 1;
        }
      }
    }
    localStorage.setItem("timelineData", JSON.stringify(allPosts));
  } 
}