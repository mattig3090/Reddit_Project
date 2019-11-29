import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  user = null;
  work = "working";
  constructor(private authService: AuthService, private router: Router) {
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/landing']);
    })
  }

   signInWithTwitter() {
      this.authService.signInWithTwitter()
      .then((res) => { 
          this.router.navigate(['landing'])
        })
      .catch((err) => console.log(err));
    }
    signInWithFacebook() {
      this.authService.signInWithFacebook()
      .then((res) => {
          this.router.navigate(['landing'])
        })
      .catch((err) => console.log(err));
    }
    signInWithGoogle() {
      this.authService.signInWithGoogle2()
      console.log("hello")
      console.log(this.authService.getUser()) 
    }
    skipToNextPage() {
      this.router.navigate(['landing'])
    }
  ngOnInit() {
  }
}