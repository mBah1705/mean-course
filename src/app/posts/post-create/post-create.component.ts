import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  imports: [MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent {
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return
    }
    alert('Post added!')
  }
}
