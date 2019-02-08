import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { BandService } from 'src/app/shared/services/band.service';
import { BandComponent } from './band.component';
import { AuthGuardService } from 'src/app/shared/guards/auth-guard.service';

const BAND_ROUTE: Routes = [
  { path: 'bands', component: BandComponent, canActivate: [AuthGuardService] }
]

@NgModule({
  declarations: [BandComponent],
  imports: [
    CommonModule, VirtualScrollerModule,
    RouterModule.forChild(BAND_ROUTE)
  ],
  providers: [BandService, AuthGuardService],
  exports: [RouterModule]
})
export class BandModule {}
