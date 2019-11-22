import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      this.authService.signInWithGoogle()
      .then((res) => {
        this.router.navigate([''])
      })
    .catch((err) => console.log(err));
      
    }
    skipToNextPage() {
      this.router.navigate(['landing'])
    }
  ngOnInit() {
  }
}