import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from "primeng/panel";
import { ProfileComponent } from './profile.component';

const PROFILE_ROUTE: Routes = [
  { path: 'user', component: ProfileComponent }
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule, ReactiveFormsModule, InputTextModule,
    PasswordModule, ButtonModule, PanelModule,
    RouterModule.forChild(PROFILE_ROUTE)
  ],
  exports: [ RouterModule ]
})
export class ProfileModule { }