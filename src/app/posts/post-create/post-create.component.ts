import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup
  submitted=false;
  private mode='create';
  private postId:string;
  private post:Post
isLoading=false

  constructor(private fb:FormBuilder,public postsService:PostsService,public route:ActivatedRoute){
  }

  ngOnInit(): void {
     this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode='edit'
        this.postId=paramMap.get('postId');
        this.isLoading=true
        this.post=this.postsService.getPost(this.postId)
        this.isLoading=false
      }else{
        this.mode='create'
        this.postId=null
      }
     })
    this.postForm=this.fb.group({
      title:new FormControl('',[Validators.required]),
      content:new FormControl('',[Validators.required]),
    })
    }
onAddPost(){
  if(this.postForm.valid){
    this.submitted=true
    console.log(this.postForm);
    if(this.mode="create"){
      this.postsService.addPost(this.postForm.value.title,this.postForm.value.content)
   this.postForm.reset()
   this.submitted=false
    }
if(this.mode="edit"){
  this.postsService.updatePost(this.postId,this.postForm.value.title,this.postForm.value.content)
  this.postForm.reset()
   this.submitted=false
}
  }
}
}
