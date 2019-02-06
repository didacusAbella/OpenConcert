import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { UserService } from 'src/app/shared/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/shared/models/user';
import { Genre } from 'src/app/shared/models/genre';

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


  constructor(private userService: UserService) {
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



}