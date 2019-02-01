import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginModule } from "./components/login/login.module";
import { SignupModule } from "./components/signup/signup.module";
import { ProfileModule } from './components/profile/profile.module';
import { EventModule } from './components/event/event.module';
import { FriendModule } from './components/friend/friend.module';

const routes: Routes = [];

@NgModule({
  imports: [
    LoginModule, SignupModule, ProfileModule,
    EventModule, FriendModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
