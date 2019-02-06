import { Injectable } from "@angular/core";
import { BaseService } from '../baseservice';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from '../models/genre';
import { Band } from '../models/band';

@Injectable()
export class GenreService extends BaseService {

  constructor(protected client: HttpClient) {
    super(client, "genres");
  }

  public allGenres(): Observable<Genre[]> {
    return this.client.get<Genre[]>(`${this.rootEndpoint}`);
  }

  public getBands(genreName: string): Observable<Band[]> {
    return this.client.get<Band[]>(`${this.rootEndpoint}/genre_bands/${genreName}`);
  }
}