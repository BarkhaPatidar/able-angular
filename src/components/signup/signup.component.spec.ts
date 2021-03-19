import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupComponent } from './signup.component';
import { UserService } from '../../services/user.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable, of } from 'rxjs';

let mockData = {
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

describe('SignupComponent', () => {
    let signupComponent: SignupComponent;
    let httpTestCtrl: HttpTestingController;
    let fixture: ComponentFixture<SignupComponent>;
    let userService: UserService;
    let btn: DebugElement;
    let registerResponse = mockData;

    // userService = {
    //     register(testData) {
    //         return of(registerResponse)
    //     }
    // }
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                FormsModule
            ],
            declarations: [
                SignupComponent
            ],
            providers: [
                UserService
                // { provide: UserService, useValue: userService }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SignupComponent);
        userService = TestBed.inject(UserService)
        httpTestCtrl = TestBed.inject(HttpTestingController);
        signupComponent = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should create the signup component', async () => {
        expect(signupComponent).toBeTruthy();
    });

    it('should create new user', () => {
        let responseBody = mockData;
        const httpResponseForRegister = { body: responseBody, type: 4 }
        const testData = {
                name: "Barkha",
                email: "barkha123@gmail.com",
                password: '123456',
                confirmPassword: '123456',
                address: {
                city: 'Khargone',
                state: 'MP',
                postalCode: '451001'
                }
        }         
        userService.register(testData).subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
            case HttpEventType.Response:
                expect(event.body).toEqual(responseBody)
            }
        })
        const mockReq = httpTestCtrl.expectOne(userService._signupUrl);
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(httpResponseForRegister);
    });

    it('should verify post register method', () => {
        httpTestCtrl.verify();
    });

});
