import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  theDB = firebase.database();
  postname = null;
  userid = null; 
  postlist = [];
  constructor(public authService: AuthService) {
    this.userid = authService.getUser();
   }

  ngOnInit() {
    this.updateList();

  }
  
  createPost() {
    //postname = "Do You Think God Stays in Heaven Because He too Lives in Fear of What He's Created" //- Dino guy from Spy Kids 2; //TODO make this an actual HTML thing: leaving funny quote
    if (!!this.postname) {
      this.theDB.ref().child("posts/").push({poster: this.userid, title: this.postname, votes: 0}) //TODO, Push() might just return a reference. THen we would have to use set on that reference
      
      this.updateList();
    }
  }
  updateList() {
    let recentPostRef = this.theDB.ref('posts').limitToLast(10);
    recentPostRef.once('value', function(snap) {
      snap.forEach(function(childsnap) {
        var childkey = childsnap.key;
        var childdata = childsnap.val();
        var toAdd = {childkey : childdata};
        this.postlist.push(toAdd);
      })
    })
  }
  onSelectPost() {
    
  }

}
