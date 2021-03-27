import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AboutComponent } from '../components/about/about.component';
import { FriendsComponent } from '../components/friends/friends.component';
import { PhotosComponent } from '../components/photos/photos.component';
import { TimelineComponent } from '../components/timeline/timeline.component';
import { AddPostModal } from '../components/add-post/add-post.component';

import { UserInterceptor } from '../interceptor/user.interceptor';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    AboutComponent,
    FriendsComponent,
    PhotosComponent,
    TimelineComponent,
    AddPostModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
