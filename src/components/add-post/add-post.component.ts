import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { PostModal } from '../shared/interface';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostModal implements OnInit {

  get user() {
    return JSON.parse(this._userService.getUserData()!)
  }

  get posts(): Array<PostModal> {
    return JSON.parse(this._userService.getPostData()!)
  }

  dismiss(): void {
    this.activeModal.dismiss()
  }

  allPosts: Array<PostModal> = [];
  
  addPostForm!: FormGroup;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private _userService: UserService, private _router: Router) {}

  ngOnInit(): void {
    this.initSavePostForm();
  }

  initSavePostForm(): void {
    this.addPostForm = this.fb.group({
      imageURL: ['', [Validators.required]],
      caption: ['', [Validators.required]]
    });
  }

  savePost() {
    
    var formValues = this.addPostForm.value;
    var postId = this.posts.length + 1;
    this.allPosts.push({
      "postId" : postId,
      "user" : this.user.name,
      "userProfile" : "profile-girl.png",
      "pic" : formValues.imageURL,
      "caption" : formValues.caption,
      "time" : new Date,
      "likes" : 0,
      "comments" : 0,
      "share" : 0,
      "liked" : ""
    })
    for(var i = 0; i < this.posts.length; i++) {
      this.allPosts.push(this.posts[i])
    }
    
    localStorage.setItem("timelineData", JSON.stringify(this.allPosts));
    location.reload()
    // this.activeModal.close()
  }
}