import { Component, OnInit } from "@angular/core";
import { EventService } from './event.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-events',
  templateUrl: './event.component.html',
  host: { 'class': 'p-col-10'}
})
export class EventComponent implements OnInit {

  public events: any[];
  public sortField: string;
  public sortOptions: SelectItem[];

  constructor(private service: EventService) {}

  ngOnInit(): void {
    this.events = [];
    this.sortOptions = [
      { label: "Locale", value: "locale"},
      { label: "Genere", value: "genre" }
    ]
  }

  onSortChange(event) {
    this.sortField = event.value;
  }
}