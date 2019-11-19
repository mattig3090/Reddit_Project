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
  postlist = null;
  constructor(public authService: AuthService) {
    this.userid = authService.getUser();
   }

  ngOnInit() {
    let recentPostRef = this.theDB.ref('posts').limitToLast(10);
    recentPostRef.once('value', function(snap) {
      snap.forEach(function(childsnap) {
        var childkey = childsnap.key;
        var childdata = childsnap.val();
        //add to list
      })
    })

  }
  
  createPost() {
    //postname = "What if god remained in heaven for he two feared what he created" //- Dino guy from Spy Kids 2; //TODO make this an actual HTML thing: leaving funny quote
    if (!!this.postname) {
      this.theDB.ref().child("posts/").push({poster: this.userid, title: this.postname, votes: 0}) //TODO, Push() might just return a reference. THen we would have to use set on that reference
      
      this.updateList();
    }
  }
  updateList() {
    

    
  }

}
