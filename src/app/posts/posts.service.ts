import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn:'root'})
export class PostsService{
  private posts:Post[]=[]

  constructor(public http:HttpClient){}

private postsUpdated=new Subject<Post[]>()
  getPosts(){
    this.http.get<{message:string,posts:Post[]}>('http://localhost:3000/api/posts')
    .subscribe((res)=>{
      this.posts=res.posts
      this.postsUpdated.next([...this.posts])
    }
    )
  }
  getPostUpdateListener(){
    return this.postsUpdated.asObservable()
  }
  addPost(title:string,content:string){
   const post:Post={title:title,content:content};
   this.http.post<{message:string}>('http://localhost:3000/api/posts',post)
   .subscribe((res)=>{
    console.log(res);
    this.posts.push(post);
    this.postsUpdated.next([...this.posts])
   })

  }
}
