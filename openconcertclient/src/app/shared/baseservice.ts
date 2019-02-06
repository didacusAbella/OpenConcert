import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENDPOINT } from './endpoint';

export class BaseService {

  public rootEndpoint: string;
  
  constructor(protected client: HttpClient, routerEndpoint){
    this.rootEndpoint = `http://${ENDPOINT.hostname}:${ENDPOINT.port}/${routerEndpoint}`;
  }
}