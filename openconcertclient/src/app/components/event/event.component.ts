import { Component, OnInit } from "@angular/core";
import { SelectItem } from 'primeng/api';
import { UserService } from 'src/app/shared/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-events',
  templateUrl: './event.component.html',
  host: { 'class': 'p-col-10'},
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  public events: any[];
  public sortField: string;
  public sortOptions: SelectItem[];
  private _helper: JwtHelperService;
  private _email: string;

  constructor(private userService: UserService) {
    this._helper = new JwtHelperService();
    this._email = this._helper.decodeToken(localStorage.getItem('secretforcreateauth')).email;
  }

  ngOnInit(): void {
    this.userService.showEvents(this._email).subscribe(evs => this.events = evs);
  }
}