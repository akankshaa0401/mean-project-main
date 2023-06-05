const express= require('express')
const app=express()
const bodyParser=require('body-parser')
const Post = require('./models/post')
const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://akanksha:JLY8suy02hKxcnYg@cluster0.mzs6pwn.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(()=>{
  console.log('Connected to database!')
}).catch(()=>{
  console.log("connection failed!");
})

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}))

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
  "GET,POST,PATCH,DELETE,OPTIONS"
  );
next()
})

app.post("/api/posts",(req,res,next)=>{
const post=new Post({
  title:req.body.title,
  content:req.body.content      
})
post.save().then(createdPost=>{
  res.status(200).json({
    message:'Post added successfully!',
    postId:createdPost._id
  })
})
})

app.get("/api/posts",(req,res,next)=>{
  Post.find().then(documents=>{
    res.status(200).json({
      message:'posts fetched successfully!',
      posts:documents
    })
  })
})

app.delete("/api/posts/:id",(req,res,next)=>{
  Post.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({
      message:"Post deleted successfully"
    })
  })
})

module.exports=app
