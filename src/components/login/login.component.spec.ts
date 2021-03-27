import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { UserService } from '../../services/user.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
    let loginComponent: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let userService: UserService;
    let btn: DebugElement;
    
  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            HttpClientTestingModule,
            ReactiveFormsModule,
            FormsModule
        ],
        declarations: [
            LoginComponent
        ],
        providers: [
            UserService
        ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    userService = TestBed.inject(UserService)
    loginComponent = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the login component', async () => {
    expect(loginComponent).toBeTruthy();
  });

  it('[Email-check]', async () => {
    let email = loginComponent.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    expect(email.errors!['required']).toBeTruthy();
    email.setValue('barkha');

    expect(email.errors!['email']).toBeTruthy();
  });

  it('[Valid-email]', () => {
    let email = loginComponent.loginForm.controls['email'];
    email.setValue('barkha@newput.com');
    expect(email.errors).toBeNull();
  });

  it('[Password-check]', () => {
    let password = loginComponent.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();
    expect(password.pristine).toBeTruthy();
    expect(password.errors!['required']).toBeTruthy();
    password.setValue('123456');
  });

  it('[Form-check] values not entered', () => {
    expect(loginComponent.loginForm.valid).toBeFalsy();
  });

  it('[Form-check] when values entered', () => {
    loginComponent.loginForm.controls['email'].setValue('barkha@newput.com');
    loginComponent.loginForm.controls['password'].setValue('123456');
    expect(loginComponent.loginForm.valid).toBeTruthy();
  });

  it('[Form-submit]', () => {
    expect(loginComponent.loginForm.invalid).toBeTruthy();
    btn = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(btn.nativeElement.disabled).toBeTruthy();

    loginComponent.loginForm.controls['email'].setValue('barkha@newput.com');
    loginComponent.loginForm.controls['password'].setValue('123456');
    fixture.detectChanges();

    expect(btn.nativeElement.disabled).toBeFalsy();

    loginComponent.onSubmit();
    fixture.detectChanges();
  });
});
