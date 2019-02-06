import { Injectable } from "@angular/core";
import { BaseService } from '../baseservice';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Locale } from '../models/locale';
import { Band } from '../models/band';

@Injectable()
export class LocaleService extends BaseService {

  constructor(protected client: HttpClient) {
    super(client, "locales");
  }

  public getLocales(): Observable<Locale[]> {
    return this.client.get<Locale[]>(`${this.rootEndpoint}`);
  }

  public createLocale(locale: Locale): Observable<boolean> {
    return this.client.post<boolean>(`${this.rootEndpoint}/locale`, locale);
  }

  public deleteLocale(localeName: string): Observable<boolean> {
    return this.client.delete<boolean>(`${this.rootEndpoint}/locale/${localeName}`);
  }

  public updateLocale(locale: Locale): Observable<boolean> {
    return this.client.put<boolean>(`${this.rootEndpoint}/locale/${locale.name}`, locale);
  }

  public getBands(localeName: string): Observable<Band[]> {
    return this.client.get<Band[]>(`${this.rootEndpoint}/locale_bands/${localeName}`);
  }
}