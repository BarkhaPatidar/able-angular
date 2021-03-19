import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestScheduler } from 'jasmine-marbles';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './user.service';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';

describe('HttpDataService', () => {
    let HttpClient: HttpClient;
    let httpTestCtrl: HttpTestingController;
    let userService: UserService;
    let userLoginObj: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [UserService]
        });
    });

    beforeEach(() => {
        userService = TestBed.inject(UserService);
        httpTestCtrl = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestCtrl.verify();
    });

    // userLoginObj = jasmine.createSpyObj('loginObj', ['add', 'remove', 'refresh'])
    // userLoginObj.add();
    // userLoginObj.remove(1);
    // userLoginObj.refresh();

    // it('post login test', () => {
    //     const testData = {
    //         email: "barkha@newput.com",
    //         password: '123456'
    //     }
    //     const result = {
    //         accessToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhcmtoYUBuZXdwdXQuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE2MTU1NDk0NjksImV4cCI6MTYxNTU5MjY2OX0.FYxRW96LnK_1jDZW9wKQPKbusUMLOIsKyo9WwNjsx_y3j2GEruUVJwdrcO63ZBWag56qsn9ci71S4JNpRJjuow",
    //         user: {
    //             city: "Khargone",
    //             createdAt: "2021-03-09T11:42:47.000Z",
    //             dob: "12th Sept 1997",
    //             email: "barkha@newput.com",
    //             followers: "2K",
    //             gender: "Female",
    //             jobs: "Newput Infotech Indore",
    //             maritalStatus: "Single",
    //             name: "Barkha Patidar",
    //             password: "jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=",
    //             postalCode: "451001",
    //             profession: "Software Engineer",
    //             profile: "profile-girl.png",
    //             skills: "NodeJs, Angular, mongodb",
    //             state: "MP",
    //             updatedAt: "2021-03-11T10:14:27.000Z",
    //             user_id: 1
    //         }
    //     }
    //     userService.login(testData).subscribe((userData) => {
    //         expect(result).toBe(userData, 'should check mocked data');
    //     });

    //     const req = httpTestCtrl.expectOne(userService._loginUrl);

    //     expect(req.cancelled).toBeFalsy();
    //     expect(req.request.responseType).toEqual('json');

    //     req.flush(result);
    // });

    // it('login test failed', () => {
    //     const testData = {
    //         email: "barkha@newput.com",
    //         password: '123456'
    //     }
    //     userService.login(testData).subscribe(result => {
    //         fail('Failing with 401');
    //     },
    //     (err: HttpErrorResponse) => {
    //         expect(err.status).toEqual(401);
    //     })
    // });

    const responseBody = {
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

    it("should check login status code", () => {
        const httpResponseForLogin = { body: responseBody, type: 4 }
        const testData = {
            email: "barkha@newput.com",
            password: '123456'
        }
        userService.login(testData).subscribe((res) => {
          
        },
        error => {
            if(error instanceof HttpErrorResponse) {
                expect(error.status).toEqual(401);
            } 
        })
        const mockReq = httpTestCtrl.expectOne(userService._loginUrl);
        mockReq.flush(httpResponseForLogin);
    });

    it("post login test", () => {
        const httpResponseForLogin = { body: responseBody, type: 4 }
        // const loginSpy = spyOn(userService, 'login').and.callThrough().calls.all();
        const testData = {
            email: "barkha@newput.com",
            password: '123456'
        }
        userService.login(testData).subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Response:
              expect(event.body).toEqual(responseBody)
          }
        })
        const mockReq = httpTestCtrl.expectOne(userService._loginUrl);
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(httpResponseForLogin);;
    });

    

    it("post register test", () => {
        const responseBody = {
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

    it("should check if user is logged in or not", () => {
        expect(userService.loggedIn).toBeTruthy();
    });

    it("should check the auth token", () => {
        expect(userService.getToken).toBeTruthy();
    });

    it("should get the user data", () => {
        let mockUser = {
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
        userService.getUserData().subscribe((userData) => {
            expect(mockUser).toBe(userData, 'should check mocked data');
        });
        const req = httpTestCtrl.expectOne(userService._dashboardUrl);
        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual('json');
        req.flush(mockUser);
    });

    // it("should get the posts data", () => {
    //     const req = httpTestCtrl.expectOne(userService._postsUrl);
    //     expect(req.cancelled).toBeFalsy();
    //     expect(req.request.responseType).toEqual('json');
    //     // req.flush(req);
    // });

    // it("should get the friends data", () => {
    //     const req = httpTestCtrl.expectOne(userService._friendsUrl);
    //     expect(req.cancelled).toBeFalsy();
    //     expect(req.request.responseType).toEqual('json');
    //     // req.flush(req);
    // });
})