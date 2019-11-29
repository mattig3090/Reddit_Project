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
  //private user: Observable<firebase.User>;
  public user; 
  private userDetails: firebase.User = null;
  public provider;
  public token = null;
  //private check = "This is bad";
  
constructor(public firebaseAuth: AngularFireAuth, private router: Router) { 
  //this.provider = new firebase.auth.GoogleAuthProvider();  
  /*
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
  */
  
  
}

doGoogleLogin(){
  return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.firebaseAuth.auth
    .signInWithPopup(provider)
    .then(res => {
      resolve(res);
    })
  })
}


//implement later maybe
signInWithTwitter() {
  return this.firebaseAuth.auth.signInWithPopup(
    new firebase.auth.TwitterAuthProvider()
  )
}
//implement later maybe
signInWithFacebook() {
  return this.firebaseAuth.auth.signInWithPopup(
    new firebase.auth.FacebookAuthProvider()
  )
}
//old one
signInWithGoogle() {
    //this.check = "this is good";  
    return this.firebaseAuth.auth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    )
  }

signInWithGoogle2() {
  console.log("made it here");
  firebase.auth().signInWithPopup(this.provider).then(function(result) {
    console.log("made it here yay");
    // This gives you a Google Access Token. You can use it to access the Google API.
    this.token = (<any>result).credential.accessToken;
    // The signed-in user info.
    this.user = result.user;
    this.userDetails = this.user;
    console.log("but I dont make it here")
    
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
      this.firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
    }
  getUser() {
    return this.userDetails;
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.firebaseAuth.auth.signOut();
        resolve();
      }
      else{
        reject();
      }
    });

  }
}
