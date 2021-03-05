import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operators';
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
  // @Output() username = "";
  @ViewChild('successAlert', {static: false}) successAlert?: NgbAlert;

  constructor(private fb: FormBuilder, private _loginService: UserService, private _router: Router, private route: ActivatedRoute, private _dataService: DataService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    // this._loginService.successMessage$
    //   .subscribe(
    //     message => {
    //       this.errMsg = message;
    //     }
    //   );
    this.route.queryParams.subscribe((params) => {
      this.errMsg = params.msg;
    });
    console.log(this.route)
      setTimeout(() => {
        this.errMsg = "";
        this.successAlert?.close();
      }, 5000); 
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this._loginService.login(this.loginForm.value)
    .subscribe(
      response => {
       
          this.errMsg = "";
          localStorage.setItem('token', response.accessToken)
          // localStorage.setItem('userData', JSON.stringify(response.user))
          this._dataService.requestDataFromMultipleSources().subscribe(responseList => {
            localStorage.setItem("panelData", JSON.stringify(responseList[0]));
            localStorage.setItem("timelineData", JSON.stringify(responseList[1]));
            localStorage.setItem("userData", JSON.stringify(responseList[2]));
          });
          this._router.navigate(['/dashboard/timeline'])
          
      },
      error => {
        if(error instanceof HttpErrorResponse) {
          if(error.status === 401) {
            this._router.navigate(['/login'], { queryParams: { msg: "Email or password is incorrect." } });
          } else if(error.status === 403) {
            this._router.navigate(['/login'], { queryParams: { msg: "Email or password is incorrect." } });
          }
        }
        
      }
    );
  }
}