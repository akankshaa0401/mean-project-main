import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  postForm: FormGroup
  constructor(private fb:FormBuilder){
  }
  enteredTitle=''
  enteredContent=''
  @Output() postCreated=new EventEmitter()
  ngOnInit(): void {

    this.postForm=this.fb.group({
      title:new FormControl('',[Validators.required]),
      content:new FormControl('',[Validators.required]),
    })
    }
onAddPost(){
  if(this.postForm.valid){
    console.log(this.postForm);
    const post : Post={
      title:this.postForm.value.title,
      content:this.postForm.value.content
    }
    this.postCreated.emit(post)
  }
}
}
