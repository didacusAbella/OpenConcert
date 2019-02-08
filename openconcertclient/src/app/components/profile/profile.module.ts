import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from "primeng/panel";
import {PickListModule} from 'primeng/picklist';
import { ProfileComponent } from './profile.component';
import { AuthGuardService } from 'src/app/shared/guards/auth-guard.service';
import { UserService } from 'src/app/shared/services/user.service';
import { DropdownModule } from 'primeng/dropdown';
import { LocaleService } from 'src/app/shared/services/locale.service';
import { GenreService } from 'src/app/shared/services/genre.service';
import { MessageService } from 'primeng/api';
import { ToastModule} from "primeng/toast";


const PROFILE_ROUTE: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule, ReactiveFormsModule, InputTextModule,
    PasswordModule, ButtonModule, PanelModule,
    DropdownModule, PickListModule, ToastModule,
    RouterModule.forChild(PROFILE_ROUTE)
  ],
  providers: [
    UserService,
    LocaleService,
    GenreService,
    MessageService,
    AuthGuardService
  ],
  exports: [ RouterModule ]
})
export class ProfileModule { }