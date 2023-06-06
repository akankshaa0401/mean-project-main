import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
@Injectable({providedIn:'root'})
export class PostsService{
  private posts:Post[]=[]

  constructor(public http:HttpClient,private router:Router){}

private postsUpdated=new Subject<Post[]>()
  getPosts(){
    this.http.get<{message:string,posts:any}>('http://localhost:3000/api/posts')
    .pipe(map((res)=>{
      return res.posts.map(post=>{
        return{
          title:post.title,
          content:post.content,
          id:post._id
        }
      })
    }))
    .subscribe((transformedPosts)=>{
      this.posts=transformedPosts
      console.log(this.posts);
      
      this.postsUpdated.next([...this.posts])
    }
    )
  }
  getPostUpdateListener(){
    return this.postsUpdated.asObservable()
  }

  addPost(title:string,content:string){
   const post:Post={id:null,title:title,content:content};
   this.http.post<{message:string,postId:string}>('http://localhost:3000/api/posts',post)
   .subscribe((res)=>{
    console.log(res);
    const id=res.postId
    post.id=id
    this.posts.push(post);
    this.postsUpdated.next([...this.posts])
   })
   this.router.navigate(["/"])
  }

getPost(id:string){
  return{...this.posts.find(p=>p.id===id)}
}

updatePost(id:string,content:string,title:string){
  const post:Post={id:id,title:title,content:content}
  this.http.put('http://localhost:3000/api/posts/' + id,post).subscribe(
    res=>console.log(res)
  )
  this.router.navigate(["/"])

}

  deletePost(postId:string){
this.http.delete('http://localhost:3000/api/posts/' + postId)
.subscribe(res=>{
  console.log('Deleted!');
  const updatedPosts=this.posts.filter(post=>post.id!==postId)
  this.posts=updatedPosts
  this.postsUpdated.next([...this.posts])
})
  }
}
