import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AddPostModal } from './add-post.component';
import { UserService } from '../../services/user.service';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

const mockUserData = {
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

describe('AddPostModal', () => {
    let addPostModal: AddPostModal;
    let fixture: ComponentFixture<AddPostModal>;
    let userService: UserService;
    let userData = mockUserData;
    let userServiceStub: UserService;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                ReactiveFormsModule
            ],
            declarations: [
                AddPostModal
            ],
            providers: [
                UserService,
                NgbActiveModal,
                {provide: UserService, useValue: userServiceStub}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddPostModal);
        userService = TestBed.inject(UserService)
        addPostModal = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should create the add-post component', fakeAsync(() => {
        expect(addPostModal).toBeTruthy();
    }));

    // userServiceStub = {
        
    // }

    it('get user data in add-post', fakeAsync(() => {
        let userDataSpy = spyOn(userService, 'getUserData').and.returnValue(of(mockUserData));
        let subSpy = spyOn(userService.userData$, 'subscribe');
        // addPostModal.ngOnInit();
        // fixture.detectChanges();
        tick();
        expect(userDataSpy).toHaveBeenCalledBefore(subSpy);
        expect(subSpy).toHaveBeenCalled();
    }));

    // it('user data subscribe execution within add post', fakeAsync(() => {
    //     addPostModal.ngOnInit();
    //     expect(addPostModal.user).toBeDefined();
    // }));

});