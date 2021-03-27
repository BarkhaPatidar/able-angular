import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'about-component',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  basicInfoForm!: FormGroup
  workInfoForm!: FormGroup

  user?: any;

  basicInfoEdit: boolean = false;
  workInfoEdit: boolean = false;
  
  constructor(public _aboutService: UserService, private fb: FormBuilder, private _router: Router) {}

  ngOnInit() {
    this.userObservable();
  }

  userObservable() {
    this._aboutService.getUserData().subscribe(userdataData => {
      this._aboutService.userInfo(userdataData)
      this.getUser();
    })
  }

  getUser() {
    this._aboutService.userData$
    .subscribe(
      res => {
        this.user = res.user;
        this.initBasicInfoForm()
        this.initWorkInfoForm()
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

  initBasicInfoForm(): void {
    this.basicInfoForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      gender: [this.user.gender, [Validators.required]],
      dob: [this.user.dob, [Validators.required]],
      maritalStatus: [this.user.maritalStatus, [Validators.required]],
      city: [this.user.city, [Validators.required]]
    });
  }

  initWorkInfoForm(): void {
    this.workInfoForm = this.fb.group({
      profession: [this.user.profession, [Validators.required]],
      skills: [this.user.skills, [Validators.required]],
      jobs: [this.user.jobs, [Validators.required]],
    });
  }

  updateBasicInfo(): void {
    var formValues = this.basicInfoForm.value;
    this.updateUser(formValues)
    this.basicInfoEdit = false;
  }

  updateWorkInfo(): void {
    var formValues = this.workInfoForm.value;
    this.updateUser(formValues)
    this.workInfoEdit = false;
  }
  
  updateUser(formValues: any) {
    this._aboutService.updateUserInfo(formValues)
    .subscribe(
      response => {
        this._aboutService.userInfo(response)
        // location.reload();
        // this.getUser();
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

  editBasicInfo(): void {
    this.basicInfoEdit = true;
  }

  editWorkInfo(): void {
    this.workInfoEdit = true;
  }
}