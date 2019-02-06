import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from "primeng/panel";
import { SelectButtonModule } from 'primeng/selectbutton';
import { ListboxModule } from 'primeng/listbox';
import { ProfileComponent } from './profile.component';
import { AuthGuardService } from 'src/app/shared/guards/auth-guard.service';
import { UserService } from 'src/app/shared/services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/shared/guards/auth.interceptor';


const PROFILE_ROUTE: Routes = [
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule, ReactiveFormsModule, InputTextModule,
    PasswordModule, ButtonModule, PanelModule,
    SelectButtonModule, ListboxModule, 
    RouterModule.forChild(PROFILE_ROUTE)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    UserService
  ],
  exports: [ RouterModule ]
})
export class ProfileModule { }