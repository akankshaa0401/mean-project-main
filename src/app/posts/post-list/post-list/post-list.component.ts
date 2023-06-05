import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../post.model';
import { PostsService } from '../../posts.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy{
posts :Post[]=[]
private postsSub:Subscription

constructor(public postsService:PostsService){}

ngOnInit(): void {
  this.postsService.getPosts()
  this.postsService.getPostUpdateListener().subscribe((posts:Post[])=>{
this.posts=posts
  })
}
onDelete(postId:string){
  this.postsService.deletePost(postId)
}
ngOnDestroy(): void {
  // this.postsSub.unsubscribe();
}

}
