import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from '../../services/auth.service';
import { PostinfoService } from '../../services/postinfo.service'; 
import { Router } from '@angular/router';



@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  theDB = firebase.database();
  postname = null;
  user = null;
  userid = null;
  tester = "work";
  public postlist = [];
  listReady = false;
  constructor(public authService: AuthService, public PostinfoService: PostinfoService, private router: Router) {
    
    
   }

  ngOnInit() {
    
    console.log("made it here 0 v2");
    this.user = this.authService.getUser();
    if (this.user) {
    this.createUser(this.user);
    console.log(this.user.uid);
    this.userid = this.user.uid;
    }
    this.updateList();
    this.listReady = true;
    

  }
  
  createPost() {
    console.log("button was pressed");
    //postname = "Do You Think God Stays in Heaven Because He too Lives in Fear of What He's Created" //- Dino guy from Spy Kids 2; //TODO make this an actual HTML thing: leaving funny quote
    if (!!this.postname) {
      
      this.theDB.ref().child('posts/').push({poster: this.userid, title: this.postname, votes: 0, comments : []}) //TODO, Push() might just return a reference. THen we would have to use set on that reference
      console.log("request was updated");
      this.updateList();
    }
  }
  updateList() {
    let postlist2 = [];
    let recentPostRef = this.theDB.ref('posts/').limitToLast(10);
    recentPostRef.once('value', function(snap) {
      snap.forEach(function(childsnap) {
        var childkey = childsnap.key;
        var childdata = childsnap.val();
        console.log(childdata);
        postlist2.push([childkey, childdata]);
      })
    });
    this.postlist = postlist2;
    

  }
  onSelectPost(post) {
    console.log(post);
    this.PostinfoService.setInfo(post);
    this.router.navigate(['subreddit']);
  }
  createUser(newUser) {
    let dbuserId;
    this.theDB.ref('/users/' + dbuserId).once('value').then(function(snapshot) {
      dbuserId = snapshot.val(); 
    });
    if (newUser.uid === dbuserId) {
      console.log("Not a New User")
    }
    else {
      this.theDB.ref('users/' + newUser.uid).set({email : newUser.email, name : newUser.displayName}) //can add whatever you want from the user JSON, I just picked these two things
    }
  }

}
