import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from "primeng/fieldset";
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';


const LOGIN_ROUTE: Routes = [
  { path: 'signin', component: LoginComponent }
]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, ReactiveFormsModule, InputTextModule,
    FieldsetModule, PasswordModule, ButtonModule,
    MessagesModule, MessageModule,
    RouterModule.forChild(LOGIN_ROUTE)
  ],
  providers: [],
  exports: [RouterModule]
})
export class LoginModule {}