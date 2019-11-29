import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostinfoService } from '../../services/postinfo.service'; 
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-subreddit',
  templateUrl: './subreddit.component.html',
  styleUrls: ['./subreddit.component.css']
})
export class SubredditComponent implements OnInit {
  theDB = firebase.database();
  postId = null;
  thePost = null; 
  comments = null;
  commentList = [];
  newCommentText = " ";
  nameOfPoster = "Anon";
  constructor(private router: Router, private postinfoService: PostinfoService) { 
    
  }



  ngOnInit() {
    let tuple = this.postinfoService.getInfo();
    this.postId = tuple[0];
    this.thePost = tuple[1];
    this.comments = this.thePost.comments;
    if (this.thePost.poster) {
      this.nameOfPoster = this.thePost.poster;
    }
    this.extractComments();
    console.log(this.postId);
    console.log(this.thePost.title)
    console.log(this.comments)

    
  }

  onLike() {
    //code from Matt Grossman
  }

  addComment() {
    console.log("wow adding a comment, much wow, so cool")
    this.theDB.ref().child("posts/"+this.postId+"/comments").push({"comment" : this.newCommentText})
    this.commentList.push({"comment" : this.newCommentText});
    if (this.commentList.length > 10) {
      this.commentList.shift();
    } 
    this.newCommentText = "";
    
  }

  extractComments() {
    let com;
    let lcommentList = [];
    let coms = this.comments;
    for (com in coms) {
      
      lcommentList.push(coms[com]);
      if (lcommentList.length > 10) {
        lcommentList.shift();
      }
      console.log(coms[com]);
      
    }
    this.commentList = lcommentList //angular is real wacky with aliasing "this" so I have trust issues now 
    
    
  }


  

}
