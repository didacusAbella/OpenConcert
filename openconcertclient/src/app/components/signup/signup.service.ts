import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { Token } from 'src/app/models/token';
import { ENDPOINT } from 'src/app/shared/endpoint';

@Injectable()
export class SignupService {

  constructor(private client: HttpClient) {}

  public signupUser(user: User): Observable<Token> {
    let endpoint = `http://${ENDPOINT.hostname}:${ENDPOINT.port}/auth/signup`;
    return this.client.post<Token>(endpoint, user);
  }
}