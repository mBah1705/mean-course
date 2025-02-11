import { Component, inject, linkedSignal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
@Component({
  selector: 'app-post-list',
  imports: [MatExpansionModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {

  private readonly postsService = inject(PostsService)
  
  posts = linkedSignal<Post[]>(() => this.postsService.getPosts()())

}
