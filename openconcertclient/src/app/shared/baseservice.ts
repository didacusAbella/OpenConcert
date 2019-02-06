import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENDPOINT } from './endpoint';

export class BaseService {

  public rootEndpoint: string;
  protected authHeaders: HttpHeaders = new HttpHeaders({
    'x-access-token': localStorage.getItem('secretforcreateauth')
  })
  
  constructor(protected client: HttpClient, routerEndpoint){
    this.rootEndpoint = `http://${ENDPOINT.hostname}:${ENDPOINT.port}/${routerEndpoint}`;
  }
}