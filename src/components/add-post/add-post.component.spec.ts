import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AddPostModal } from './add-post.component';
import { UserService } from '../../services/user.service';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, Observable, of } from 'rxjs';

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

const mockPostData = [
    {
        "postId" : 1,
        "user" : "Hermione Granger",
        "userProfile" : "profile-girl.png",
        "pic" : "https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "caption" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
        "time" : "2021-01-20 22:14:23",
        "likes" : 40,
        "comments" : 20,
        "share" : 4,
        "liked" : ""
    }
]

describe('AddPostModal', () => {
    let addPostModal: AddPostModal;
    let fixture: ComponentFixture<AddPostModal>;
    let userService: Partial<UserService>;
    let mockResponse = mockUserData;
    let mockPostResponse = mockPostData;
    let response = new BehaviorSubject<any>(mockUserData);
    let postResponse = new BehaviorSubject<any>(mockPostData);

    userService = {
        userData$ : response.asObservable(),
        postData$ : postResponse.asObservable(),
        getUserData: function() {
            return of(mockResponse);
        },
        addPost: function(post) {
            return of(mockPostResponse);
        },
        postInfo: function(newPost: any) {
            response.next(newPost);
        }
    }

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
                {provide: UserService, useValue: userService}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddPostModal);
        userService = TestBed.inject(UserService)
        addPostModal = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should create the add-post component', () => {
        expect(addPostModal).toBeTruthy();
    });

    it('should call ngOnInit in add-post', () => {
        let userDataSpy = spyOn(addPostModal, 'getUser');
        let postDataSpy = spyOn(addPostModal, 'getPosts');
        let saveFormSpy = spyOn(addPostModal, 'initSavePostForm');

        addPostModal.ngOnInit();

        expect(userDataSpy).toHaveBeenCalled();
        expect(postDataSpy).toHaveBeenCalled();
        expect(saveFormSpy).toHaveBeenCalled();

        addPostModal.user = mockResponse.user;
        // addPostModal.ngOnInit();
        // fixture.detectChanges();
        // tick();
        // expect(userDataSpy).toHaveBeenCalledBefore(subSpy);
        // expect(subSpy).toHaveBeenCalled();
    });

    it('check imageURL validation', async () => {
        let imageURL = addPostModal.addPostForm.controls['imageURL'];
        expect(imageURL.valid).toBeFalsy();
        expect(imageURL.pristine).toBeTruthy();
        expect(imageURL.errors!['required']).toBeTruthy();
        imageURL.setValue('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRTOka7yiD9kwnZGsEZR6-w40z2R9obqb8-g&usqp=CAU');
    
        // expect(imageURL.errors!['imageURL']).toBeTruthy();
    });

    it('check caption validation', async () => {
        let caption = addPostModal.addPostForm.controls['caption'];
        expect(caption.valid).toBeFalsy();
        expect(caption.pristine).toBeTruthy();
        expect(caption.errors!['required']).toBeTruthy();
        caption.setValue('Lorem Ipsum....!');
    
        // expect(caption.errors!['caption']).toBeTruthy();
    });

    it('addPostForm values not entered', () => {
        expect(addPostModal.addPostForm.valid).toBeFalsy();
    });

    it('check addPostForm when values entered', () => {
        addPostModal.addPostForm.controls['imageURL'].setValue('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRTOka7yiD9kwnZGsEZR6-w40z2R9obqb8-g&usqp=CAU');
        addPostModal.addPostForm.controls['caption'].setValue('Lorem Ipsum....!');
        expect(addPostModal.addPostForm.valid).toBeTruthy();
    });

    it('submit addPostForm', () => {
        expect(addPostModal.addPostForm.invalid).toBeTruthy();
        const btn = fixture.nativeElement.querySelector('button[type=submit]');
        // btn = fixture.debugElement.query(By.css('button[type=submit]'));
        expect(btn.disabled).toBeTruthy();
    
        addPostModal.addPostForm.controls['imageURL'].setValue('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRTOka7yiD9kwnZGsEZR6-w40z2R9obqb8-g&usqp=CAU');
        addPostModal.addPostForm.controls['caption'].setValue('Lorem Ipsum....!');
        fixture.detectChanges();
    
        expect(btn.disabled).toBeFalsy();
        // btn.click();
        addPostModal.savePost();
        fixture.detectChanges();
    });

    // it('user data subscribe execution within add post', fakeAsync(() => {
    //     addPostModal.ngOnInit();
    //     expect(addPostModal.user).toBeDefined();
    // }));

});