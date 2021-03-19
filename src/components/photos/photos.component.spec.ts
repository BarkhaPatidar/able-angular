import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PhotosComponent } from './photos.component';
import { UserService } from '../../services/user.service';

describe('PhotosComponent', () => {
    let photosComponent: PhotosComponent;
    let fixture: ComponentFixture<PhotosComponent>;
    let userService: UserService;
    
  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            HttpClientTestingModule
        ],
        declarations: [
            PhotosComponent
        ],
        providers: [
            UserService
        ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosComponent);
    userService = TestBed.inject(UserService)
    photosComponent = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the photos component', async () => {
    expect(PhotosComponent).toBeTruthy();
  });

});