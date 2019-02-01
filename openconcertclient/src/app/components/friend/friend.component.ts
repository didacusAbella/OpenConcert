import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { FriendService } from './friend.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friend.component.html',
  host: { 'class': 'p-col-8' }
})
export class FriendComponent implements OnInit {

  public users$: Observable<User[]>;
  public friends: Observable<User[]>;

  constructor(private friendService: FriendService) {}

  ngOnInit(): void {
    this.users$ = this.friendService.allUsers();
  }

}