import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
// import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { PostModal } from '../shared/interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostModal implements OnInit {

  user?: any;
  posts?: any;

  dismiss(): void {
    this.activeModal.dismiss()
  }

  allPosts: any;
  
  addPostForm!: FormGroup;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private _userService: UserService, private _router: Router) {}

  ngOnInit(): void {
    this.getUser();
    this.getPosts();
    this.initSavePostForm();
  }

  getUser() {
    this._userService.userData$
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
    this._userService.postData$
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

  initSavePostForm(): void {
    this.addPostForm = this.fb.group({
      imageURL: ['', [Validators.required]],
      caption: ['', [Validators.required]]
    });
  }

  savePost() {
    console.log("---------------- ", this.user);
    var formValues = this.addPostForm.value;
    var newPost = {
      "user" : this.user.name,
      "userProfile" : "profile-girl.png",
      "pic" : formValues.imageURL,
      "caption" : formValues.caption,
      "time" : new Date,
      "likes" : 0,
      "comments" : 0,
      "share" : 0,
      "liked" : ""
    }

    this._userService.addPost(newPost)
    .subscribe(
      response => {
        // location.reload();
        this._userService.postInfo(response);
        this.dismiss();
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