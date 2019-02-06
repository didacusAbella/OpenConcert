import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Band } from 'src/app/shared/models/band';
import { BandService } from 'src/app/shared/services/band.service';

@Component({
  selector: 'app-bands',
  templateUrl: './band.component.html',
  host: {'class': 'p-col-8'}
})
export class BandComponent implements OnInit {

  public bands: Observable<Band[]>;

  constructor(private bandService: BandService){}

  ngOnInit(): void {
    this.bands = this.bandService.getBands();
  }

}