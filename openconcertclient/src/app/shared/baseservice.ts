import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENDPOINT } from './endpoint';

export class BaseService {

  public rootEndpoint: string;
  protected authHeaders: HttpHeaders;

  constructor(protected client: HttpClient, routerEndpoint){
    this.authHeaders = new HttpHeaders();
    this.authHeaders.set("x-access-token", localStorage.getItem('secretforcreateauth'));
    this.rootEndpoint = `http://${ENDPOINT.hostname}:${ENDPOINT.port}/${routerEndpoint}`;
  }
}