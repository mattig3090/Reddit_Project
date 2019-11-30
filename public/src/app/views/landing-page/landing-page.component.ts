import { Component, OnInit } from '@angular/core';
import * as firebase from '@firebase/app';
import 'firebase/database';
import { AuthService } from '../../services/auth.service';
import { PostinfoService } from '../../services/postinfo.service'; 
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FirebaseUserModel } from '../../services/user.model';




@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  theDB = firebase.database();
  postname = null;
  user: FirebaseUserModel = new FirebaseUserModel();  
  userid = null;
  tester = "work";
  public postlist = [];
  listReady = false;
  constructor(public authService: AuthService, public PostinfoService: PostinfoService, private router: Router, private route: ActivatedRoute,
    public userService: UserService) {
    
    
   }

  ngOnInit() {
    
    console.log("made it here 0 v2");
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        console.log("there is data");
        //this.createForm(this.user.name);
      }
    })
    this.userid = this.user.uid;
    if (this.userid) {
      this.createUser(this.userid);
    }
    this.updateList();
    this.listReady = true;
    console.log(this.user);
    

  }
  
  createPost() {
    console.log("button was pressed");
    //postname = "Do You Think God Stays in Heaven Because He too Lives in Fear of What He's Created" //- Dino guy from Spy Kids 2; //TODO make this an actual HTML thing: leaving funny quote
    if (!!this.postname) {
      
      this.theDB.ref().child('posts/').push({poster: this.user.name, title: this.postname, votes: 0, comments : []}) //TODO, Push() might just return a reference. THen we would have to use set on that reference
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
<<<<<<< HEAD
    })
  }
  onSelectPost() {
    let totalRef = firebase.database().ref("total");
      totalRef.on("value", function(ss){
        let data = ss.val();
        $(".total").html(data);
      });
      var myCurrentVote = false;
      let myVoteRef = firebase.database().ref("votes").child(myid);
      myVoteRef.on("value",function(ss){
        let data = ss.val();
        myCurrentVote = data;
        if(!!myCurrentVote){
          $(".yesno").html("HAVE");
        }else{
          $(".yesno").html("HAVE NOT");
        };
      });
=======
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

  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.router.navigate(['']);
    }, (error) => {
      console.log("Logout error", error);
    });
>>>>>>> 2435e6d5c66b2fb3fed1bc42e19b2bd79546c51d
  }
}
