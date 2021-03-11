import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
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
  errMsg = "";

  get getAddress() {
    return this.registrationForm.get('address')
  }


  constructor( private fb: FormBuilder, private _registrationService: UserService, private _router: Router, private _dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    if(this._registrationService.loggedIn()) {
      this._router.navigate(['/dashboard/timeline'])
    }
    
    this.initRegistrationForm();

    this.route.queryParams.subscribe((params) => {
      if(params.exist && params.exist == "true") {
        this.errMsg = "User already exist, please try with different email."
      }
    });
    
  }

  initRegistrationForm(): void {
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

  onSubmit(): void {
    this._registrationService.register(this.registrationForm.value)
    .subscribe(
      response => {
        this.errMsg = "";
        this._registrationService.userInfo(response)
        localStorage.setItem('token', response.accessToken)
        this._router.navigate(['/dashboard/timeline'])
        
      },
      error => {
        if(error instanceof HttpErrorResponse) {
          if(error.status === 401) {
            this._router.navigate(['/signup'])
          } else if(error.status === 403) {
            this._router.navigate(['/signup'])
          } else if(error.status === 409) {
            this._router.navigate(['/signup'], { queryParams: { exist: "true" } });
          }
        }
      }
    );
  }
}