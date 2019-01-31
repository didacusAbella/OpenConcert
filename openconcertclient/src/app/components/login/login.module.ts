import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from "primeng/fieldset";
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';


const LOGIN_ROUTE: Routes = [
  { path: 'login', component: LoginComponent }
]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, ReactiveFormsModule, InputTextModule,
    FieldsetModule, PasswordModule, ButtonModule, 
    RouterModule.forChild(LOGIN_ROUTE)
  ],
  exports: [RouterModule]
})
export class LoginModule {}