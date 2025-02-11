import { Injectable, signal } from '@angular/core';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly posts = signal<Post[]>([])

  getPosts() {
    return signal<Post[]>([...this.posts()])
  }

  addPost(title: string, content: string) {
    const post: Post = { title, content };
    this.posts.update(oldPosts => [...oldPosts, post]);
  }
}
