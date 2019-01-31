import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginModule } from "./components/login/login.module";
import { SignupModule } from "./components/signup/signup.module";

const routes: Routes = [];

@NgModule({
  imports: [
    LoginModule, SignupModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
