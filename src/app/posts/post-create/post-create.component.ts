import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  imports: [MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent {
  private readonly postsService = inject(PostsService)
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return
    }
    
    this.postsService.addPost(form.value.title, form.value.content)
    form.reset()
  }
}
