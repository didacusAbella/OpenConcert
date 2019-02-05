import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { LocaleComponent } from './locale.component';

const LOCALE_ROUTES: Routes = [
  { path: "locales", component: LocaleComponent }
]

@NgModule({
  declarations: [LocaleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class LocaleModule {}