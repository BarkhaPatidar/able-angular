import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { passwordValidator } from '../shared/password.validator';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registrationForm!: FormGroup;

  get getAddress() {
    return this.registrationForm.get('address')
  }


  constructor( private fb: FormBuilder, private _registrationService: UserService, private _router: Router, private _dataService: DataService) {}

  ngOnInit() {
    
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      address: this.fb.group({
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        postalCode: ['', [Validators.required]]
      })
    }, {validator: passwordValidator});
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this._registrationService.register(this.registrationForm.value)
    .subscribe(
      response => {
        this._dataService.requestDataFromMultipleSources().subscribe(responseList => {
          localStorage.setItem("panelData", responseList[0]);
            localStorage.setItem("timelineData", responseList[1]);
            localStorage.setItem("userData", responseList[2]);
        });
        localStorage.setItem('token', response.accessToken)
        this._router.navigate(['/dashboard/timeline'])
        
      },
      error => {
        if(error instanceof HttpErrorResponse) {
          if(error.status === 401) {
            this._router.navigate(['/signup'])
          } else if(error.status === 403) {
            this._router.navigate(['/signup'])
          }
        }
        
      }
    );
  }
}