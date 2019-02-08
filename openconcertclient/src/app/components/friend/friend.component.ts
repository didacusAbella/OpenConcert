import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { TreeNode, MessageService, SelectItem } from 'primeng/api';
import { UserService } from 'src/app/shared/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/shared/models/user';
import { Genre } from 'src/app/shared/models/genre';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-friends',
  templateUrl: './friend.component.html',
  host: { 'class': 'p-col-10' }
})
export class FriendComponent implements OnInit {

  public friends: User[];
  private _email: string;
  private _helper: JwtHelperService;
  public cityFriends: any[];
  public commonFriends: any[];
  public ffriends: any[];
  public genresTips: Genre[];
  public genreFriends: any[];
  public options: SelectItem[];

  constructor(private userService: UserService, private message: MessageService) {
    this.friends = new Array();
    this._helper = new JwtHelperService();
    this._email = this._helper.decodeToken(localStorage.getItem('secretforcreateauth')).email;
  }
  
  ngOnInit(): void {
    this.userService.getFriends(this._email).subscribe(frs => this.friends = frs);
    this.userService.friendsCommonSameCity(this._email).subscribe(reccommendedFriends => { 
      this.cityFriends = reccommendedFriends.filter(el => el.preference === 2);
      this.commonFriends = reccommendedFriends.filter(el => el.preference === 1);
      this.ffriends = reccommendedFriends.filter(el => el.preference === 0);
      this.genreFriends = reccommendedFriends.filter(el => el.genre === true);
    });
    this.userService.friendsShareGenres(this._email).subscribe(genres => this.genresTips = genres);
  }

  public addFriend(userEmail: string) {
    this.userService.addFriend(this._email, userEmail).subscribe(friend => {
      if(friend) {
        this.message.add({ severity: "success", summary: "Amico Aggiunto", detail: `Ora segui ${userEmail}`});
      }
    })
  }

  public removeFriend(userEmail: string) {
    this.userService.removeFriend(this._email, userEmail).subscribe(friend => {
      if (friend) {
        this.message.add({ severity: "success", summary: "Amico Rimosso", detail: `Non segui più ${userEmail}`});
      }
    })
  }


}