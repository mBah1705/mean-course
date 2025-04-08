import { Component, inject, linkedSignal, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-post-list',
  imports: [MatExpansionModule, MatButtonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {

  private readonly postsService = inject(PostsService)
  
  posts = linkedSignal<Post[]>(() => this.postsService.posts())

  ngOnInit(): void {
    this.postsService.getPosts()
  }

  onDeletePost(postId: string | null) {
    this.postsService.deletePost(postId)
  }
}
