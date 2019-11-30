import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { SubredditComponent } from './views/subreddit/subreddit.component'; 
import { UserResolver } from './views/landing-page/user.resolver'; 

const routes: Routes = [
{path: '', component: LoginPageComponent,},
{path: 'landing', component: LandingPageComponent, resolve: { data: UserResolver}},
{path: 'subreddit', component: SubredditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
