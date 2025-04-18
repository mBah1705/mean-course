import { Component, inject, linkedSignal, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { getFrenchPaginatorIntl } from './french-paginator-intl';
@Component({
  selector: 'app-post-list',
  imports: [MatExpansionModule, MatButtonModule, MatPaginatorModule, RouterLink],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  providers: [
    { provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl() } // Uncomment this line to use the custom paginator
  ],
})
export class PostListComponent implements OnInit {

  private readonly postsService = inject(PostsService)
  
  posts = linkedSignal<Post[]>(() => this.postsService.posts())

  pageIndex = 0
  pageSize = 2
  length = linkedSignal<number>(() => this.postsService.maxPosts())
  pageSizeOptions = [1, 2, 5, 10]

  ngOnInit(): void {
    this.postsService.getPosts(this.pageSize, this.pageIndex + 1)
  }

  onChangedPage(event: PageEvent) {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.postsService.getPosts(event.pageSize, event.pageIndex + 1)
  }

  onDeletePost(postId: string | null) {
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.pageSize, this.pageIndex + 1)
    })
  }
}
