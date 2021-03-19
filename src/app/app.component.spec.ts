import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserService } from '../services/user.service';
import { DebugElement } from '@angular/core';

describe('AppComponent', () => {
    let app: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let userService: UserService;
    let debugEle: DebugElement;

    // let http = TestBed.get(HttpTestingController);
    

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            HttpClientTestingModule
        ],
        declarations: [
            AppComponent
        ],
        providers: [
            UserService
        ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    userService = TestBed.inject(UserService)
    app = fixture.componentInstance;
    debugEle = fixture.debugElement
    fixture.detectChanges();
  })

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('ngOnInit()', () => {
    let userOb = spyOn(app, 'userObservable');
    app.ngOnInit();
    expect(userOb).toHaveBeenCalled();
  })

  it(`should return logout boolean`, () => {
    let isLogout = app.logout();
    expect(isLogout).toBeFalsy();
    // let isLogout = spyOn(userService, 'loggedIn');
    // app.logout();
    // expect(isLogout).toHaveBeenCalled();
  });
});
