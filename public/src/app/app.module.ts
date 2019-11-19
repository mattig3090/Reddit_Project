import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AuthService } from './services/auth.service';


const config = {
  apiKey: "AIzaSyDN6I0Ff_99vstAsgOQcnPkuyUaUo5V5zo",
  authDomain: "firstttt-264e8.firebaseapp.com",
  databaseURL: "https://firstttt-264e8.firebaseio.com",
  projectId: "firstttt-264e8",
  storageBucket: "firstttt-264e8.appspot.com",
  messagingSenderId: "1074679339656",
  appId: "1:1074679339656:web:1702aa6fe5411fd1d69d3d"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AppRoutingModule,
    FormsModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
