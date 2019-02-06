import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { BandService } from 'src/app/shared/services/band.service';
import { BandComponent } from './band.component';

const BAND_ROUTE: Routes = [
  { path: 'bands', component: BandComponent }
]

@NgModule({
  declarations: [BandComponent],
  imports: [
    CommonModule, VirtualScrollerModule,
    RouterModule.forChild(BAND_ROUTE)
  ],
  providers: [BandService],
  exports: [RouterModule]
})
export class BandModule {}
