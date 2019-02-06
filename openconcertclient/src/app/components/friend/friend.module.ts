import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FriendComponent } from './friend.component';
import { ButtonModule } from "primeng/button";
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import {OrderListModule} from 'primeng/orderlist';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { UserService } from 'src/app/shared/services/user.service';

const FRIEND_ROUTE: Routes = [
  { path: "friends", component: FriendComponent }
];

@NgModule({
  declarations: [ FriendComponent ],
  imports: [
    CommonModule, ReactiveFormsModule,
    TabViewModule, ButtonModule, DialogModule,
    OrderListModule, CarouselModule, ButtonModule,
    CardModule, TableModule, VirtualScrollerModule,
    RouterModule.forChild(FRIEND_ROUTE)
  ],
  providers: [UserService],
  exports: [ RouterModule ]
})
export class FriendModule {}