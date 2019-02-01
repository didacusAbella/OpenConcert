import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { BasicService } from 'src/app/shared/baseservice';
import { Injectable } from '@angular/core';

@Injectable()
export class FriendService extends BasicService {

  constructor(protected client: HttpClient) {
    super(client, "users");
  }

  public allUsers(): Observable<User[]> {
    return this.client.get<User[]>(`${this.rootEndpoint}`);
  }

  public userFriends(userEmail: string): Observable<User[]> {
    return this.client.get<User[]>(`${this.rootEndpoint}/user_friends/${userEmail}`);
  }

  public findUser(email: string): Observable<User> {
    return this.client.get<User>(`${this.rootEndpoint}/user/${email}`);
  }
}