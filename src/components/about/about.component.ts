import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'about-component',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  basicInfoForm!: FormGroup
  workInfoForm!: FormGroup

  get user() {
    return JSON.parse(this._aboutService.getUserData()!)
  }

  basicInfoEdit: boolean = false;
  workInfoEdit: boolean = false;
  
  constructor(public _aboutService: UserService, private fb: FormBuilder) {}

  ngOnInit() {
    
    this.initBasicInfoForm()
    this.initWorkInfoForm()
    
  }

  initBasicInfoForm(): void {
    this.basicInfoForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      gender: [this.user.gender, [Validators.required]],
      dob: [this.user.dob, [Validators.required]],
      maritalStatus: [this.user.maritalStatus, [Validators.required]],
      location: [this.user.location, [Validators.required]]
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
    var userInfo = this.user;
    userInfo.name = formValues.name;
    userInfo.gender = formValues.gender;
    userInfo.dob = formValues.dob;
    userInfo.maritalStatus = formValues.maritalStatus;
    userInfo.location = formValues.location;
    localStorage.setItem("userData", JSON.stringify(userInfo));
    this.basicInfoEdit = false;
    location.reload()
  }

  updateWorkInfo(): void {
    var formValues = this.workInfoForm.value;
    var userInfo = this.user;
    userInfo.profession = formValues.profession;
    userInfo.skills = formValues.skills;
    userInfo.jobs = formValues.jobs;
    localStorage.setItem("userData", JSON.stringify(userInfo));
    this.workInfoEdit = false;
    location.reload()
  }

  editBasicInfo(): void {
    this.basicInfoEdit = true;
  }

  editWorkInfo(): void {
    this.workInfoEdit = true;
  }
}