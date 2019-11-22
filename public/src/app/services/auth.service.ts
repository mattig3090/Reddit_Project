/*
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}
*/
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
@Injectable()
export class AuthService {
  //private user = null;
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  //private check = "This is bad";
  
constructor(private _firebaseAuth: AngularFireAuth, private router: Router) { 
    
  this.user = this._firebaseAuth.authState;
  this.user.subscribe(
    (user) => {
      if (user) {
        this.userDetails = user;
        console.log(this.userDetails);
      }

      else {
        this.userDetails = null;
      }
    }

  );
  
  
}


//implement later maybe
signInWithTwitter() {
  return this._firebaseAuth.auth.signInWithPopup(
    new firebase.auth.TwitterAuthProvider()
  )
}
//implement later maybe
signInWithFacebook() {
  return this._firebaseAuth.auth.signInWithPopup(
    new firebase.auth.FacebookAuthProvider()
  )
}
//old one
signInWithGoogle() {
    //this.check = "this is good";  
    return this._firebaseAuth.auth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    )
  }

signInWIthGoogle2() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    //var token = result.credential.accessToken;
    // The signed-in user info.
    this.user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

  isLoggedIn() {
    if (this.user == null ) {
        return false;
      } else {
        return true;
      }
    }
  logout() {
      this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
    }
  getUser() {
    return this.userDetails;
  }
  }

