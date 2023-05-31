import { Component, Input } from '@angular/core';
import { Post } from '../../post.model';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
// posts=[
//   {title:"First Post",content:"this is post description"},
//   {title:"Second Post",content:"this is post description"},
//   {title:"Third Post",content:"this is post description"},
//   {title:"Fourth Post",content:"this is post description"}
// ]
@Input() posts :Post[]=[]
}
