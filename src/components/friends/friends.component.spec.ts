import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FriendsComponent } from './friends.component';
import { UserService } from '../../services/user.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('FriendsComponent', () => {
    let friendsComponent: FriendsComponent;
    let fixture: ComponentFixture<FriendsComponent>;
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
            FriendsComponent
        ],
        providers: [
            UserService
        ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsComponent);
    userService = TestBed.inject(UserService)
    friendsComponent = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the friends component', async () => {
    expect(FriendsComponent).toBeTruthy();
  });

});
