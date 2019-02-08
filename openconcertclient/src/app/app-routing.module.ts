import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginModule } from "./components/login/login.module";
import { SignupModule } from "./components/signup/signup.module";
import { ProfileModule } from './components/profile/profile.module';
import { EventModule } from './components/event/event.module';
import { FriendModule } from './components/friend/friend.module';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { LocaleModule } from './components/locale/locale.module';
import { BandModule } from './components/band/band.module';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

const routes: Routes = [
  { path: '', redirectTo: "/signin", pathMatch: "full" },
  { path: 'unauthorized', component: UnauthorizedComponent}
];

@NgModule({
  declarations: [UnauthorizedComponent],
  imports: [
    LoginModule, SignupModule, ProfileModule,
    EventModule, FriendModule, LocaleModule,
    BandModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
})
export class AppRoutingModule { }
