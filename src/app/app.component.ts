import { Component } from '@angular/core';
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { HeaderComponent } from "./header/header.component";
import { PostListComponent } from "./posts/post-list/post-list.component";

@Component({
  selector: 'app-root',
  imports: [PostCreateComponent, HeaderComponent, PostListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mean-course';
}
