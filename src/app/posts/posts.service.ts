import { inject, Injectable, signal } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly _posts = signal<Post[]>([])

  httpClient = inject(HttpClient)

  get posts() {
    return this._posts
  }

  getPosts() {
    this.httpClient.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
      .pipe(
        map(responseData => {
          return responseData.posts.map((post: { title: string; content: string; _id: string; }) => {
            return {title: post.title, content: post.content, id: post._id}
          })
        })
      )
    .subscribe(postsData => this._posts.set(postsData));
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title, content };
    this.httpClient.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post).subscribe(response => {
      post.id = response.postId    
      this._posts.update(oldPosts => [...oldPosts, post]);
    })

  }

  deletePost(postId: string | null) {
    this.httpClient.delete(`http://localhost:3000/api/posts/${postId}`).subscribe(response => {
      console.log(response);
      
      this._posts.update(oldPosts => oldPosts.filter(post => post.id !== postId))
    })
  }
}
