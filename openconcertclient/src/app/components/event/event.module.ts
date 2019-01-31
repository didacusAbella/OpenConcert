import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { EventComponent } from './event.component';
import { EventService } from './event.service';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from "primeng/inputtext";


const EVENT_ROUTE: Routes = [
  { path: "events", component: EventComponent }
]

@NgModule({
  declarations: [ EventComponent],
  imports: [
    CommonModule, DataViewModule, DropdownModule,
    InputTextModule,
    RouterModule.forChild(EVENT_ROUTE)
  ],
  providers: [EventService],
  exports: [RouterModule]
})
export class EventModule {}