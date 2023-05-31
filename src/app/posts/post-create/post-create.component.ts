import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  postForm: FormGroup
  submitted=false
  constructor(private fb:FormBuilder,public postsService:PostsService){
  }

  ngOnInit(): void {

    this.postForm=this.fb.group({
      title:new FormControl('',[Validators.required]),
      content:new FormControl('',[Validators.required]),
    })
    }
onAddPost(){
  if(this.postForm.valid){
    this.submitted=true
    console.log(this.postForm);
   this.postsService.addPost(this.postForm.value.title,this.postForm.value.content)
   this.postForm.reset()
   this.submitted=false
  }
}
}
