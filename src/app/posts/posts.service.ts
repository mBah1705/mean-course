import { inject, Injectable, signal } from '@angular/core';
import { Post, PostData } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly _posts = signal<Post[]>([])
  private readonly _maxPosts = signal<number>(0)

  httpClient = inject(HttpClient)
  private readonly router = inject(Router)

    private readonly apiUrl = environment.apiUrl + '/posts/';
  

  get posts() {
    return this._posts
  }

  get maxPosts() {
    return this._maxPosts
  }

  getPosts(pagesize: number, page: number) {
    const queryParams = `?pagesize=${pagesize}&page=${page}`
    this.httpClient.get<{message: string, posts: any, maxPosts: number}>(this.apiUrl + queryParams)
      .pipe(
        map(responseData => {
          return {
            posts: responseData.posts.map((post: PostData) => {
              return {title: post.title, content: post.content, id: post._id, imagePath: post.imagePath, creator: post.creator}
            }), 
            maxPosts: responseData.maxPosts
          }
        })
      )
    .subscribe(postsData => {
      this._posts.set(postsData.posts)
      this._maxPosts.set(postsData.maxPosts)
    })
  }

  getPost(id: string | null) {
    return this.httpClient.get<{message: string, post: PostData}>(`${this.apiUrl}${id}`)
      .pipe(
        map(responseData => {
          return {
            title: responseData.post.title,
            content: responseData.post.content,
            id: responseData.post._id,
            imagePath: responseData.post.imagePath,
            creator: responseData.post.creator
          }
        })
      )
  }

  addPost(title: string, content: string, image: File | null) {
    const postData = new FormData()

    postData.append('title', title)
    postData.append('content', content)
    if (image) {
      postData.append('image', image, title)
    }

    this.httpClient.post<{message: string, post: Post}>(this.apiUrl, postData).subscribe(() => {
      this.router.navigate(['/'])
    })
  }

  updatePost(id: string | null, title: string, content: string, image: File | string | null) {
    const post: Post = { id, title, content, imagePath: image as string, creator: null };
    this.httpClient.put(`${this.apiUrl}${id}`, post).subscribe(() => {
      this.router.navigate(['/'])
      })
  }

  deletePost(postId: string | null) {
    return this.httpClient.delete(`${this.apiUrl}${postId}`)
  }
}
