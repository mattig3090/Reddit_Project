import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';


const routes: Routes = [
{path: '', component: LoginPageComponent,},
{path: 'landing', component: LandingPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
