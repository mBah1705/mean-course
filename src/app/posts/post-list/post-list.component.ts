import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '../post.model';
@Component({
  selector: 'app-post-list',
  imports: [MatExpansionModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {
  posts: Post[] = []
}
