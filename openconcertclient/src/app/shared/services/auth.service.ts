import { Injectable } from "@angular/core";
import { BaseService } from '../baseservice';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../models/token';
import { User } from '../models/user';

@Injectable()
export class AuthService extends BaseService {

  constructor(protected client: HttpClient) {
    super(client, "auth");
  }

  public login(email: string, password: string): Observable<Token> {
    let body = { "email": email, "password": password }
    return this.client.post<Token>(`${this.rootEndpoint}/login`, body);
  }

  public logout(): boolean {
    if (localStorage.getItem('secretforcreateauth') != null) {
      localStorage.removeItem('secretforcreateauth');
      return true;
    } else {
      return false;
    }
  }

  public signup(user: User): Observable<Token> {
    return this.client.post<Token>(`${this.rootEndpoint}/signup`, user);
  }

}