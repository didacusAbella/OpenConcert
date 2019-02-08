import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { LocaleComponent } from './locale.component';
import { TableModule } from 'primeng/table';
import { LocaleService } from 'src/app/shared/services/locale.service';
import { AuthGuardService } from 'src/app/shared/guards/auth-guard.service';

const LOCALE_ROUTES: Routes = [
  { path: "locales", component: LocaleComponent, canActivate: [AuthGuardService] }
]

@NgModule({
  declarations: [LocaleComponent],
  imports: [
    CommonModule, ReactiveFormsModule, TableModule,
    RouterModule.forChild(LOCALE_ROUTES)
  ],
  providers: [LocaleService, AuthGuardService],
  exports: [RouterModule]
})
export class LocaleModule {}