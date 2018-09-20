import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Post [];

  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;

  constructor(private postService: PostService) {}

  getPosts(): void{
    this.postService.getPosts()
    .subscribe(posts => {
      this.posts = posts
    }, error => console.log(error));
  }

  save(title: string, description: string): void{
    let post: Post ={
      title: title,
      description: description
    };
    this.postService.savePost(post)
    .subscribe(post => {
      console.log('post saved');
      this.changeSuccessMessage();
      this.getPosts();
    }, error => console.log(error))
  };

  ngOnInit() {
    this.getPosts();

    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  };

  public changeSuccessMessage() {
    this._success.next("Post saved!");
  }
}
