import { Injectable } from "@angular/core";
import { BaseService } from '../baseservice';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Band } from '../models/band';

@Injectable()
export class BandService extends BaseService {

  constructor(protected client: HttpClient) {
    super(client, "bands");
  }

  public getBands(): Observable<Band[]> {
    return this.client.get<Band[]>(`${this.rootEndpoint}`, { headers: this.authHeaders });
  }
}