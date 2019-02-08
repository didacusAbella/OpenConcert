import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { EventComponent } from './event.component';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from "primeng/inputtext";
import { UserService } from 'src/app/shared/services/user.service';
import { AuthGuardService } from 'src/app/shared/guards/auth-guard.service';


const EVENT_ROUTE: Routes = [
  { path: "events", component: EventComponent, canActivate: [AuthGuardService] }
]

@NgModule({
  declarations: [ EventComponent],
  imports: [
    CommonModule, DataViewModule, DropdownModule,
    InputTextModule,
    RouterModule.forChild(EVENT_ROUTE)
  ],
  providers: [UserService, AuthGuardService],
  exports: [RouterModule]
})
export class EventModule {}