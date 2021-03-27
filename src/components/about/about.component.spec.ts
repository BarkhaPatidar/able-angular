import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AboutComponent } from './about.component';
import { UserService } from '../../services/user.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

const result = {
            accessToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhcmtoYUBuZXdwdXQuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE2MTU1NDk0NjksImV4cCI6MTYxNTU5MjY2OX0.FYxRW96LnK_1jDZW9wKQPKbusUMLOIsKyo9WwNjsx_y3j2GEruUVJwdrcO63ZBWag56qsn9ci71S4JNpRJjuow",
            user: {
                city: "Khargone",
                createdAt: "2021-03-09T11:42:47.000Z",
                dob: "12th Sept 1997",
                email: "barkha@newput.com",
                followers: "2K",
                gender: "Female",
                jobs: "Newput Infotech Indore",
                maritalStatus: "Single",
                name: "Barkha Patidar",
                password: "jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=",
                postalCode: "451001",
                profession: "Software Engineer",
                profile: "profile-girl.png",
                skills: "NodeJs, Angular, mongodb",
                state: "MP",
                updatedAt: "2021-03-11T10:14:27.000Z",
                user_id: 1
            }
}

const userFormValues = {
    name: "Barkha",
    gender: "Female",
    dob: "12th Sept 1997",
    maritalStatus: "Single",
    city: "Khargone"
}

describe('AboutComponent', () => {
    let aboutComponent: AboutComponent;
    let fixture: ComponentFixture<AboutComponent>;
    let userService: Partial<UserService>;
    let formValue = userFormValues;
    let btn: DebugElement;
    let mockResponse = result;
    let response = new BehaviorSubject<any>(result)
    // response = result
    

    userService = {
        userData$ : response.asObservable(),
        getUserData: function() {
            return of(mockResponse);
        },
        userInfo: function(currentUser: any) {
            response.next(currentUser);
        },
        updateUserInfo: function(formData: any) {
            return of(mockResponse);
        }
    }

    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                FormsModule
            ],
            declarations: [
                AboutComponent
            ],
            providers: [
                // UserService
                {provide: UserService, useValue: userService}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AboutComponent);
        userService = TestBed.inject(UserService)
        aboutComponent = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should create the about component', async () => {
        expect(AboutComponent).toBeTruthy();
    });

    it('should get user data', async () => {
        userService.userData$
        ?.subscribe(res => {
            expect(res).toBe(mockResponse);
        },
        error => {
            if(error instanceof HttpErrorResponse) {
                expect(error.status).toBe(401);
                // expect(error.status).toBe(403);
            }
        });  
    });

    it('should call getUser in about component', () => {
        var getUserSpy = spyOn(aboutComponent, 'getUser');
        var basicInfoFormSpy = spyOn(aboutComponent, 'initBasicInfoForm');
        var workInfoFormSpy = spyOn(aboutComponent, 'initWorkInfoForm');
        aboutComponent.userObservable();
        expect(getUserSpy).toHaveBeenCalled();
        expect(basicInfoFormSpy).toHaveBeenCalled();
        expect(workInfoFormSpy).toHaveBeenCalled();
    });

    // it('should update user', () => {
    //     userService.updateUserInfo(formValue)
    //     .subscribe(res => {

    //     },
    //     err => {

    //     })
    // });

});
