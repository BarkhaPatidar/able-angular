import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
// import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { UserService } from '../../services/user.service';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
    let dashboardComponent: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let userService: UserService;
    // let activatedRoute: ActivatedRoute;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule
            ],
            declarations: [
                DashboardComponent
            ],
            providers: [
                UserService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            children: [{
                                routeConfig: {
                                    path: 'timeline'
                                }
                            }]
                        }
                    }
                    
                }
                // { provide: Router, useValue: mockRouter}
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        userService = TestBed.inject(UserService)
        dashboardComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the dashboard component', async () => {
        expect(DashboardComponent).toBeTruthy();
    });

    let mockRouter = {
	    navigate: jasmine.createSpy('navigate')
    }

    it('should check isActive', () => {
        let mockdata = 'timeline';
        dashboardComponent.isActive(mockdata);
        // expect (mockRouter.navigate).toHaveBeenCalled();
    })

});