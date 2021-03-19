import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  errMsg = "";

  @ViewChild('errorAlert', {static: false}) errorAlert?: NgbAlert;

  constructor(private fb: FormBuilder, private _loginService: UserService, private _router: Router, private route: ActivatedRoute, private _dataService: DataService) {}

  ngOnInit(): void {

    if(this._loginService.loggedIn()) {
      this._router.navigate(['/dashboard/timeline'])
    }
    
    this.initLoginForm();

    this.route.queryParams.subscribe((params) => {
      if(params.invalid && params.invalid == "true") {
        this.errMsg = "Email or password is incorrect."
      }
    });

    setTimeout(() => {
      this.errMsg = "";
      this.errorAlert?.close();
    }, 5000); 
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this._loginService.login(this.loginForm.value)
    .subscribe(
      response => {
        console.log(response);
        this.errMsg = "";
        this._loginService.userInfo(response)
        localStorage.setItem('token', response.accessToken)
        this._router.navigate(['/dashboard/timeline'])  
      },
      error => {
        if(error instanceof HttpErrorResponse) {
          if(error.status === 401) {
            this._router.navigate(['/login'], { queryParams: { invalid: "true" } });
          } else if(error.status === 403) {
            this._router.navigate(['/login'], { queryParams: { invalid: "true" } });
          }
        } 
      }
    );
  }
}