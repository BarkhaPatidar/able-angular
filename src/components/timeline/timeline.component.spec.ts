import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TimelineComponent } from './timeline.component';
import { UserService } from '../../services/user.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('TimelineComponent', () => {
    let timelineComponent: TimelineComponent;
    let fixture: ComponentFixture<TimelineComponent>;
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
            TimelineComponent
        ],
        providers: [
            UserService
        ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineComponent);
    userService = TestBed.inject(UserService)
    timelineComponent = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the timeline component', async () => {
    expect(timelineComponent).toBeTruthy();
  });

});
