import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  rootUrl = 'http://127.0.0.1:3000/';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.rootUrl); 
  }

  savePost(post: Post): Observable<Post>{
    return this.http.post<Post>(this.rootUrl+'admin/posts/create/', post);
  }

}
