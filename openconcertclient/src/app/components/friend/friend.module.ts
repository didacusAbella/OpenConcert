import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FriendComponent } from './friend.component';
import { PickListModule } from 'primeng/picklist';
import { ButtonModule } from "primeng/button";
import { DialogModule } from 'primeng/dialog';


const FRIEND_ROUTE: Routes = [
  { path: "friends", component: FriendComponent }
];

@NgModule({
  declarations: [ FriendComponent ],
  imports: [
    CommonModule, ReactiveFormsModule,
    PickListModule, ButtonModule, DialogModule,
    RouterModule.forChild(FRIEND_ROUTE)
  ],
  providers: [],
  exports: [ RouterModule ]
})
export class FriendModule {}