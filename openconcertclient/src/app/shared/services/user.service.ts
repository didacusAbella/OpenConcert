import { Injectable } from "@angular/core";
import { BaseService } from '../baseservice';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService extends BaseService {

  constructor(protected client: HttpClient) {
    super(client, "users");
  }

}