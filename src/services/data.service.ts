import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public requestDataFromMultipleSources(): Observable<any[]> {
    let friendsData = this.http.get('assets/data/friends.json');
    let posts = this.http.get('assets/data/posts.json');
    let profile = this.http.get('assets/data/user.json');
    return forkJoin([friendsData, posts, profile]);
  }
}