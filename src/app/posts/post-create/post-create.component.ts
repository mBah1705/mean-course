import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../post.model';
import { mimeType } from './mime-type.validator';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-post-create',
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent implements OnInit {
  private readonly postsService = inject(PostsService)
  private readonly route: any = inject(ActivatedRoute)
  private readonly router: any = inject(Router)

  form: FormGroup = new FormGroup({
    title: new FormControl(null, { validators: [Validators.required] }),
    content: new FormControl(null, { validators: [Validators.required] }),
    image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
  })

  imageFormControlIsValid = true

  imagePreview: string | ArrayBuffer | null = null
  imageBlob: File | null = null
  postId: string | null = null
  isEditMode = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isEditMode = true
        this.postId = paramMap.get('id')
        this.imagePreview = null
        this.postsService.getPost(this.postId).subscribe((post: Post) => {
          this.form.setValue({
            title: post.title,
            content: post.content,
            image: post.imagePath
          })
          this.imagePreview = post.imagePath
          
        })
      } else {
        this.isEditMode = false
        this.postId = null
      }
    })
  }

  ngONviewInit() {
    console.log(this.paginator);
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    if(file?.type.includes('image/')) {
    this.imageBlob = file 
    }

    const reader = new FileReader()
    reader.onload = () => {
      this.form.patchValue({ image: reader.result })
      this.form.get('image')?.updateValueAndValidity()
      this.imageFormControlIsValid = this.form.get('image')?.valid || false
      this.imagePreview = reader.result
    }
    if(!file) {
      return
    }
    reader.readAsDataURL(file)
  }
  
  onSavePost() {
    if (this.form.invalid || !this.imagePreview) {
      this.imageFormControlIsValid = this.form.get('image')?.valid || false
      return
    }

    if (this.isEditMode) {
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image)
    } else {
      this.postsService.addPost(this.form.value.title, this.form.value.content, this.imageBlob)
    }
    
    // this.form.reset()
    // this.router.navigate(['/'])
  }
}
