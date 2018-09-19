import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Post [];

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
    }, error => console.log(error))
  };

  ngOnInit() {
    this.getPosts();
  }

}
