import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AboutComponent } from '../components/about/about.component';
import { FriendsComponent } from '../components/friends/friends.component';
import { PhotosComponent } from '../components/photos/photos.component';
import { TimelineComponent } from '../components/timeline/timeline.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    {
      path: 'timeline', 
      component: TimelineComponent
    },
    {
      path: 'about',
      component: AboutComponent
    },
    {
      path: 'photos',
      component: PhotosComponent
    },
    {
      path: 'friends',
      component: FriendsComponent
    },
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  LoginComponent,
  SignupComponent,
  DashboardComponent,
  AboutComponent,
  FriendsComponent,
  PhotosComponent,
  TimelineComponent
]
