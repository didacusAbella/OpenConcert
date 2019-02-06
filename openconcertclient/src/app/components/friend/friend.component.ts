import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { UserService } from 'src/app/shared/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-friends',
  templateUrl: './friend.component.html',
  host: { 'class': 'p-col-8' }
})
export class FriendComponent implements OnInit {

  public friends: User[];
  private _email: string;
  private _helper: JwtHelperService;

  constructor(private userService: UserService) {
    this.friends = new Array();
    this._helper = new JwtHelperService();
    this._email = this._helper.decodeToken(localStorage.getItem('secretforcreateauth')).email;
  }
  
  ngOnInit(): void {
    this.userService.getFriends(this._email).subscribe(frs => this.friends = frs);
  }



}